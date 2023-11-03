// import ethers from 'ethers'
import { makeAutoObservable } from 'mobx'
import { request, shiftAttestations } from './utils'
import { SERVER } from '../config'

export default class Unirep {
  deploymentIds = []
  deploymentsById = new Map()
  allSignUps = []
  signUpsByUserId = new Map()
  attestationsById = new Map()
  attestationsByEpochKey = new Map()
  attestationIds = []
  totalBytes = null
  attestationCount = null
  signUpCount = null
  attesterCount = null
  descriptionsByAttesterId = new Map()

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}
  async searchForId(id, network, SUM_FIELD_COUNT, REPL_NONCE_BITS) {
    if (this.signUpsByUserId.get(`${network}_${id}`)) return 'user'
    else if (this.attestationsByEpochKey.get(`${network}_${id}`))
      return 'epochKey'
    else if (this.deploymentsById.get(`${network}_${id}`)) return 'attester'
    else {
      const userCount = await this.loadSignUpsByUser(id, network)
      if (userCount) return 'user'
      const epkCount = await this.loadAttestationsByEpochKey(
        id,
        network,
        SUM_FIELD_COUNT,
        REPL_NONCE_BITS
      )
      if (epkCount) return 'epochKey'
      const attesterCount = await this.loadAttesterByID(id, network)
      if (attesterCount) return 'attester'
      return 'unknown'
    }
  }

  async loadAttesterDeployments(network) {
    // TODO: recursively query
    const query = `
    {
      attesters (
        where: {
            attesterId_not: "0"
        },
        orderBy: startTimestamp
      ){
        id
        startTimestamp
        epochLength
        attesterId
        transactionHash
      }
    }`
    const data = await request(network, query)
    const items = data.data.attesters
    if (items.length) {
      this.ingestAttesterDeployments(items, network)
    }
  }

  async loadAttesterByID(id, network) {
    // TODO: recursively query
    const query = `
    {
      attesters (
        where: {
            attesterId: "${id}"
        }
      ){
        id
        startTimestamp
        epochLength
        attesterId
        transactionHash
      }
    }`
    const data = await request(network, query)
    const items = data.data.attesters
    if (items.length) {
      this.ingestAttesterDeployments(items, network)
    }
    return items.length
  }

  async ingestAttesterDeployments(_deployments, network) {
    const deployments = [_deployments].flat()
    this.deploymentIds = deployments.map((d) => d.attesterId)
    for (const d of deployments) {
      this.deploymentsById.set(`${network}_${d.attesterId}`, d)
    }
  }

  // async loadAllSignUps(network) {
  //   const query = `
  //   {
  //     users (
  //       orderBy: blockTimestamp
  //     ) {
  //       id
  //       epoch
  //       commitment
  //       attesterId
  //       transactionHash
  //     }
  //   }
  //   `
  //   const data = await request(network, query)
  //   const items = data.data.users
  //   this.ingestSignUps(items)
  // }

  // async ingestSignUps(signups) {
  //   for (const signup of signups) {
  //     const userId = signup.commitment
  //     const { attesterId } = signup
  //     if (this.signUpsByUserId.has(userId)) {
  //       // make sure not to insert duplicates
  //       const signups = this.signUpsByUserId
  //         .get(userId)
  //         .filter((s) => s.id !== signup.id)
  //         .push(signup)
  //       this.signUpsByUserId.set(signups)
  //     } else {
  //       this.signUpsByUserId.set(userId, [signup])
  //     }
  //   }
  // }

  async loadSignUpsByUser(userId, network) {
    // TODO: recursively query
    const query = `{
      users (where: {
          commitment: "${userId}"
      },
      orderBy: blockTimestamp,
      orderDirection: desc) {
          id
          epoch
          commitment
          blockNumber
          blockTimestamp
          attesterId
          transactionHash
      }
    }`
    const data = await request(network, query)
    const items = data.data.users
    if (items.length) {
      this.signUpsByUserId.set(`${network}_${items[0].commitment}`, items)
    }
    return items.length
  }

  async loadAllAttestations(network, sumFieldCount, replNonceBits) {
    // TODO: recursively query
    const query = `{
      attestations (orderBy: blockTimestamp, orderDirection: desc) {
        id
        epochKey
        attesterId
        blockNumber
        change
        epoch
        fieldIndex
        blockTimestamp
        transactionHash
      }
    }`
    const item = await request(network, query)
    const attestations = await shiftAttestations(
      item.data.attestations,
      sumFieldCount,
      replNonceBits
    )
    this.ingestAttestations(attestations, network)
  }

  async ingestAttestations(_attestations, network) {
    // accept an array or a single item
    const attestations = [_attestations].flat()
    // store allAttestations as ids to prevent duplicating data
    this.attestationIds = attestations.map((a) => a.id)
    for (const a of attestations) {
      this.attestationsById.set(a.id, a)
      const { epochKey } = a
      if (this.attestationsByEpochKey.has(`${network}_${epochKey}`)) {
        const attestations = this.attestationsByEpochKey
          .get(`${network}_${epochKey}`)
          .filter((attestation) => attestation.id !== a.id)
          .push(a)
        this.attestationsByEpochKey.set(attestations)
      } else {
        this.attestationsByEpochKey.set(`${network}_${epochKey}`, [a])
      }
    }
  }

  async loadAttestationsByEpochKey(
    epochKey,
    network,
    sumFieldCount,
    replNonceBits
  ) {
    // TODO: recursively query
    const query = `{
      attestations (
          where: {
              epochKey: "${epochKey.toString()}"
          },
          orderBy: blockTimestamp,
          orderDirection: desc
      ) {
          id
          epoch
          epochKey
          blockNumber
          blockTimestamp
          attesterId
          change
          fieldIndex
          transactionHash
      }
  }`
    const res = await request(network, query)
    const items = res.data.attestations
    const attestations = await shiftAttestations(
      items,
      sumFieldCount,
      replNonceBits
    )
    if (items.length) {
      this.attestationsByEpochKey.set(
        `${network}_${items[0].epochKey}`,
        attestations
      )
    }
    return items.length
  }

  async loadStats(network) {
    // TODO: recursively query
    const queryCount = 1000
    let bytes = 0
    const query = `
    {
      attestations (
        first: ${queryCount}
    ) {
        id
        change
    }
    attesters (
      first: ${queryCount}
      where: {
        attesterId_not: "0"
      }
    ) {
      id
    }
    users (
      first: ${queryCount}
  ) {
      id
  }
    }
    `
    const data = await request(network, query)
    data.data.attestations.map((data) => {
      bytes += Math.ceil(BigInt(data.change).toString(16).length / 2)
    })
    this.totalBytes = bytes
    this.attestationCount = data.data.attestations.length
    this.signUpCount = data.data.users.length
    this.attesterCount = data.data.attesters.length
  }

  async updateAttesterDescription(
    attesterId,
    network,
    icon,
    url,
    name,
    description,
    signature,
    nonce
  ) {
    const data = await fetch(`${SERVER}/api/about/${attesterId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        network,
        icon,
        url,
        name,
        description,
        signature,
        nonce,
      }),
    }).then((r) => r.json())
    if (!data.passed) return data.error
    return 'info updated!'
  }

  async loadAttesterDescription(attesterId, network) {
    const info = await fetch(`${SERVER}/api/about/${attesterId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        network: network,
      },
    }).then((r) => r.json())
    this.descriptionsByAttesterId.set(attesterId, info)
  }
}
