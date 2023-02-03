import { EventEmitter } from 'events'
import { ethers } from 'ethers'
import {
  IncrementalMerkleTree,
  SparseMerkleTree,
  hash2,
  hash4,
  stringifyBigInts,
} from '@unirep/utils'
import UNIREP_ABI from '@unirep/contracts/abi/Unirep.json' assert { type: 'json' }

const DUMMY_ATTESTER_ID = 'attester_id'
/**
 * The synchronizer is used to construct the Unirep state. After events are emitted from the Unirep contract,
 * the synchronizer will verify the events and then save the states.
 */
export class Synchronizer extends EventEmitter {
  _db
  provider
  unirepContract

  _eventHandlers
  _eventFilters

  constructor(config) {
    super()
    const { db, unirepAddress, provider } = config
    this._db = db
    this.unirepContract = new ethers.Contract(
      unirepAddress,
      UNIREP_ABI,
      provider
    )
    this.provider = provider
    const allEventNames = {}

    this._eventHandlers = Object.keys(this.contracts).reduce((acc, address) => {
      // build _eventHandlers and decodeData functions
      const { contract, eventNames } = this.contracts[address]
      const handlers = {}
      for (const name of eventNames) {
        if (allEventNames[name]) {
          throw new Error(`duplicate event name registered "${name}"`)
        }
        allEventNames[name] = true
        const topic = contract.filters[name]().topics[0]
        const handlerName = `handle${name}`
        if (typeof this[handlerName] !== 'function') {
          throw new Error(
            `No handler for event ${name} expected property "${handlerName}" to exist and be a function`
          )
        }
        // set this up here to avoid re-binding on every call
        const handler = this[`handle${name}`].bind(this)
        handlers[topic] = ({ event, ...args }) => {
          const decodedData = contract.interface.decodeEventLog(
            name,
            event.data,
            event.topics
          )
          // call the handler with the event and decodedData
          return handler({ decodedData, event, ...args }).catch((err) => {
            console.log(`${name} handler error`)
            throw err
          })
          // uncomment this to debug
          // console.log(name, decodedData)
        }
      }
      return {
        ...acc,
        ...handlers,
      }
    }, {})
    this._eventFilters = Object.keys(this.contracts).reduce((acc, address) => {
      const { contract, eventNames } = this.contracts[address]
      const filter = {
        address,
        topics: [
          // don't spread here, it should be a nested array
          eventNames.map((name) => contract.filters[name]().topics[0]),
        ],
      }
      return {
        ...acc,
        [address]: filter,
      }
    }, {})
  }

  async setup() {
    const config = await this.unirepContract.config()
    this.settings = {}
    this.settings.stateTreeDepth = config.stateTreeDepth
    this.settings.epochTreeDepth = config.epochTreeDepth
    this.settings.epochTreeArity = config.epochTreeArity
    this.settings.numEpochKeyNoncePerEpoch =
      config.numEpochKeyNoncePerEpoch.toNumber()
  }

  /**
   * Start synchronize the events with Unirep contract util a `stop()` is called.
   * The synchronizer will check the database first to check if
   * there is some states stored in database
   */
  async start() {
    await this.setup()
    const state = await this._db.findOne('SynchronizerState', {
      where: {},
    })
    if (!state) {
      await this._db.create('SynchronizerState', {
        attesterId: DUMMY_ATTESTER_ID,
        latestProcessedBlock: 0,
        latestProcessedTransactionIndex: 0,
        latestProcessedEventIndex: 0,
        latestCompleteBlock: 0,
      })
    }
    this.startDaemon()
  }

  /**
   * Stop synchronizing with Unirep contract.
   */
  async stop() {
    const waitForStopped = new Promise((rs) => this.once('__stopped', rs))
    if (!this.emit('__stop')) {
      this.removeAllListeners('__stopped')
      throw new Error('No daemon is listening')
    }
    await waitForStopped
  }

  async startDaemon() {
    const stoppedPromise = new Promise((rs) =>
      this.once('__stop', () => rs(null))
    )
    const waitForNewBlock = (afterBlock) =>
      new Promise(async (rs) => {
        const _latestBlock = await this.provider.getBlockNumber()
        if (_latestBlock > afterBlock) return rs(_latestBlock)
        this.provider.once('block', rs)
      })
    const startState = await this._db.findOne('SynchronizerState', {
      where: {
        attesterId: DUMMY_ATTESTER_ID,
      },
    })
    let latestProcessed = startState?.latestCompleteBlock ?? 0
    for (;;) {
      const newBlockNumber = await Promise.race([
        waitForNewBlock(latestProcessed),
        stoppedPromise,
      ])
      // if newBlockNumber is null the daemon has been stopped
      if (newBlockNumber === null) break
      const allEvents = await this.loadNewEvents(
        latestProcessed + 1,
        newBlockNumber
      )
      const state = await this._db.findOne('SynchronizerState', {
        where: {
          attesterId: DUMMY_ATTESTER_ID,
        },
      })
      if (!state) throw new Error('State not initialized')
      const unprocessedEvents = allEvents.filter((e) => {
        if (e.blockNumber === state.latestProcessedBlock) {
          if (e.transactionIndex === state.latestProcessedTransactionIndex) {
            return e.logIndex > state.latestProcessedEventIndex
          }
          return e.transactionIndex > state.latestProcessedTransactionIndex
        }
        return e.blockNumber > state.latestProcessedBlock
      })
      await this.processEvents(unprocessedEvents)
      await this._db.update('SynchronizerState', {
        where: {
          attesterId: DUMMY_ATTESTER_ID,
        },
        update: {
          latestCompleteBlock: newBlockNumber,
        },
      })
      latestProcessed = newBlockNumber
    }
    this.removeAllListeners('__stop')
    this.emit('__stopped')
  }

  // Overridden in subclasses
  async loadNewEvents(fromBlock, toBlock) {
    const promises = []
    for (const address of Object.keys(this.contracts)) {
      const { contract } = this.contracts[address]
      const filter = this._eventFilters[address]
      promises.push(contract.queryFilter(filter, fromBlock, toBlock))
    }
    return (await Promise.all(promises)).flat()
  }

  // override this and only this
  get contracts() {
    return {
      [this.unirepContract.address]: {
        contract: this.unirepContract,
        eventNames: [
          'UserSignedUp',
          'UserStateTransitioned',
          'AttestationSubmitted',
          'EpochEnded',
          'StateTreeLeaf',
          'EpochTreeLeaf',
          'AttesterSignedUp',
        ],
      },
    }
  }

  async processEvents(events) {
    if (events.length === 0) return
    events.sort((a, b) => {
      if (a.blockNumber !== b.blockNumber) {
        return a.blockNumber - b.blockNumber
      }
      if (a.transactionIndex !== b.transactionIndex) {
        return a.transactionIndex - b.transactionIndex
      }
      return a.logIndex - b.logIndex
    })

    const blockNumbers = events.reduce((acc, event) => {
      return [
        ...acc.filter((num) => num !== event.blockNumber),
        event.blockNumber,
      ]
    }, [])
    for (const blockNum of blockNumbers) {
      const blockTimestamp = await this._db.findOne('BlockTimestamp', {
        where: {
          number: blockNum,
        },
      })
      if (!blockTimestamp) {
        const result = await this.provider.getBlock(blockNum)
        const timestamp = result.timestamp
        // console.log('getBlock result:', result)
        // console.log('getBlock.timestamp:', timestamp)
        await this._db.create('BlockTimestamp', {
          number: blockNum,
          timestamp,
        })
      }
    }

    for (const event of events) {
      try {
        let success
        await this._db.transaction(async (db) => {
          const handler = this._eventHandlers[event.topics[0]]
          if (!handler) {
            throw new Error(`Unrecognized event topic "${event.topics[0]}"`)
          }
          success = await handler({ event, db })
          db.update('SynchronizerState', {
            where: {
              attesterId: DUMMY_ATTESTER_ID,
            },
            update: {
              latestProcessedBlock: +event.blockNumber,
              latestProcessedTransactionIndex: +event.transactionIndex,
              latestProcessedEventIndex: +event.logIndex,
            },
          })
        })
        if (success) this.emit(event.topics[0], event)
        this.emit('processedEvent', event)
      } catch (err) {
        console.log(`Error processing event:`, err)
        console.log(event)
        throw err
      }
    }
  }

  /**
   * Wait the synchronizer to process the events until the latest block.
   */
  async waitForSync(blockNumber) {
    const latestBlock =
      blockNumber ?? (await this.unirepContract.provider.getBlockNumber())
    for (;;) {
      const state = await this._db.findOne('SynchronizerState', {
        where: {
          attesterId: DUMMY_ATTESTER_ID,
        },
      })
      if (state && state.latestCompleteBlock >= latestBlock) return
      await new Promise((r) => setTimeout(r, 250))
    }
  }

  async readCurrentEpoch(attesterId) {
    const currentEpoch = await this._db.findOne('Epoch', {
      where: {
        attesterId: attesterId.toString(),
      },
      orderBy: {
        number: 'desc',
      },
    })
    return (
      currentEpoch || {
        number: 0,
        sealed: false,
      }
    )
  }

  async loadCurrentEpoch(attesterId) {
    const epoch = await this.unirepContract.attesterCurrentEpoch(attesterId)
    return BigInt(epoch.toString())
  }

  async epochTreeRoot(attesterId, epoch) {
    return this.unirepContract.attesterEpochRoot(attesterId, epoch)
  }

  async nullifierExist(nullifier) {
    const epochEmitted = await this.unirepContract.usedNullifiers(nullifier)
    return epochEmitted.gt(0)
  }

  /**
   * Check if the global state tree root is stored in the database
   * @param root The queried global state tree root
   * @param epoch The queried epoch of the global state tree
   * @returns True if the global state tree root exists, false otherwise.
   */
  async stateTreeRootExists(attesterId, root, epoch) {
    return this.unirepContract.attesterStateTreeRootExists(
      attesterId,
      epoch,
      root
    )
  }

  /**
   * Check if the epoch tree root is stored in the database.
   * @param _epochTreeRoot The queried epoch tree root
   * @param epoch The queried epoch of the epoch tree
   * @returns True if the epoch tree root is in the database, false otherwise.
   */
  async epochTreeRootExists(_epochTreeRoot, epoch) {
    const root = await this.unirepContract.epochRoots(epoch)
    return root.toString() === _epochTreeRoot.toString()
  }

  /**
   * Get the number of global state tree leaves in a given epoch.
   * @param epoch The epoch query
   * @returns The number of the global state tree leaves
   */
  async numStateTreeLeaves(attesterId, epoch) {
    return this._db.count('StateTreeLeaf', {
      epoch: epoch,
      attesterId: attesterId.toString(),
    })
  }

  // unirep event handlers

  async handleAttesterSignedUp({ event, db, decodedData }) {
    const attesterId = BigInt(decodedData.attesterId).toString()
    const epochLength = Number(decodedData.epochLength)
    const startTimestamp = await this.unirepContract.attesterStartTimestamp(
      attesterId
    )
    db.create('Attester', {
      _id: attesterId,
      epochLength,
      startTimestamp: startTimestamp.toNumber(),
    })
  }

  async handleStateTreeLeaf({ event, db, decodedData }) {
    const epoch = Number(decodedData.epoch)
    const index = Number(decodedData.index)
    const attesterId = BigInt(decodedData.attesterId).toString()
    const hash = BigInt(decodedData.leaf).toString()
    const Blocktimestamp = await this._db.findOne('BlockTimestamp', {
      where: {
        number: event.blockNumber,
      },
    })
    const timestamp = Blocktimestamp.timestamp
    db.create('StateTreeLeaf', {
      epoch,
      hash,
      index,
      attesterId,
      timestamp,
    })
    return true
  }

  async handleEpochTreeLeaf({ event, db, decodedData }) {
    const epoch = Number(decodedData.epoch)
    const index = BigInt(decodedData.index).toString()
    const attesterId = BigInt(decodedData.attesterId).toString()
    const leaf = BigInt(decodedData.leaf).toString()
    const epochKey = BigInt(decodedData.epochKey).toString()
    const posRep = BigInt(decodedData.posRep).toString()
    const negRep = BigInt(decodedData.negRep).toString()
    const graffiti = BigInt(decodedData.graffiti).toString()
    const id = `${epoch}-${index}-${attesterId}`
    const Blocktimestamp = await this._db.findOne('BlockTimestamp', {
      where: {
        number: event.blockNumber,
      },
    })
    const timestamp = Blocktimestamp.timestamp
    db.upsert('EpochTreeLeaf', {
      where: {
        id,
      },
      update: {
        hash: leaf,
      },
      create: {
        id,
        epoch,
        index,
        attesterId,
        hash: leaf,
        timestamp,
        epochKey,
        posRep,
        negRep,
        graffiti,
      },
    })
    return true
  }

  async handleUserSignedUp({ decodedData, event, db }) {
    const epoch = Number(decodedData.epoch)
    const commitment = BigInt(
      decodedData.identityCommitment.toString()
    ).toString()
    const attesterId = BigInt(decodedData.attesterId.toString()).toString()
    const leafIndex = Number(decodedData.leafIndex)
    const Blocktimestamp = await this._db.findOne('BlockTimestamp', {
      where: {
        number: event.blockNumber,
      },
    })
    const timestamp = Blocktimestamp.timestamp
    db.create('UserSignUp', {
      commitment,
      epoch,
      attesterId,
      timestamp,
    })
    return true
  }

  async handleAttestationSubmitted({ decodedData, event, db }) {
    const epoch = Number(decodedData.epoch)
    const epochKey = BigInt(decodedData.epochKey).toString()
    const attesterId = BigInt(decodedData.attesterId).toString()
    const posRep = Number(decodedData.posRep)
    const negRep = Number(decodedData.negRep)
    const Blocktimestamp = await this._db.findOne('BlockTimestamp', {
      where: {
        number: event.blockNumber,
      },
    })
    const timestamp = Blocktimestamp.timestamp

    const index = `${event.blockNumber
      .toString()
      .padStart(15, '0')}${event.transactionIndex
      .toString()
      .padStart(8, '0')}${event.logIndex.toString().padStart(8, '0')}`

    const currentEpoch = await this.readCurrentEpoch(attesterId)
    if (epoch !== Number(currentEpoch.number)) {
      throw new Error(
        `Synchronizer: Epoch (${epoch}) must be the same as the current synced epoch ${currentEpoch.number}`
      )
    }
    const { data } = await this._db.findOne('GlobalData', {
      where: {
        _id: 'attestations',
      },
    })

    const stats = JSON.parse(data)
    stats.posRep += posRep
    stats.negRep += negRep
    db.update('GlobalData', {
      where: {
        _id: 'attestations',
      },
      update: {
        data: JSON.stringify(stats),
      },
    })

    db.create('Attestation', {
      _id: index,
      epoch,
      epochKey,
      index,
      attesterId,
      posRep,
      negRep,
      graffiti: decodedData.graffiti.toString(),
      timestamp,
      // timestamp: decodedData.timestamp.toString(),
      hash: hash4([
        posRep,
        negRep,
        decodedData.graffiti,
        timestamp,
        // decodedData.timestamp,
      ]).toString(),
    })
    return true
  }

  async handleUserStateTransitioned({ decodedData, event, db }) {
    const transactionHash = event.transactionHash
    const epoch = Number(decodedData.epoch)
    const attesterId = BigInt(decodedData.attesterId).toString()
    const leafIndex = BigInt(decodedData.leafIndex).toString()
    const nullifier = BigInt(decodedData.nullifier).toString()
    const hashedLeaf = BigInt(decodedData.hashedLeaf).toString()
    const Blocktimestamp = await this._db.findOne('BlockTimestamp', {
      where: {
        number: event.blockNumber,
      },
    })
    const timestamp = Blocktimestamp.timestamp

    db.create('Nullifier', {
      epoch,
      attesterId,
      nullifier,
      transactionHash,
      timestamp,
    })

    return true
  }

  async handleEpochEnded({ decodedData, event, db }) {
    const epoch = Number(decodedData.epoch)
    const attesterId = BigInt(decodedData.attesterId).toString()
    const Blocktimestamp = await this._db.findOne('BlockTimestamp', {
      where: {
        number: event.blockNumber,
      },
    })
    const timestamp = Blocktimestamp.timestamp
    console.log(`Epoch ${epoch} ended`)
    const existingDoc = await this._db.findOne('Epoch', {
      where: {
        number: epoch,
        attesterId,
      },
    })
    if (existingDoc) {
      db.update('Epoch', {
        where: {
          number: epoch,
          attesterId,
        },
        update: {
          sealed: true,
          timestamp,
        },
      })
    } else {
      db.create('Epoch', {
        number: epoch,
        attesterId,
        sealed: true,
        timestamp,
      })
    }
    // create the next stub entry
    db.create('Epoch', {
      number: epoch + 1,
      attesterId,
      sealed: false,
      timestamp,
    })
    return true
  }
}
