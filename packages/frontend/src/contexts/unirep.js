import { makeAutoObservable } from 'mobx'
import { request } from './utils'

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

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}
  async searchForId(id) {
    if (this.signUpsByUserId.get(id)) return 'user'
    else if (this.attestationsByEpochKey.get(id)) return 'epochKey'
    else if (this.deploymentsById.get(id)) return 'attester'
    else {
      const userCount = await this.loadSignUpsByUser(id)
      if (userCount) return 'user'
      const epkCount = await this.loadAttestationsByEpochKey(id)
      if (epkCount) return 'epochKey'
      const attesterCount = await this.loadAttesterByID(id)
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
      }
    }`
    const data = await request(network, query)
    const items = data.data.attesters
    if (items.length) {
      this.ingestAttesterDeployments(items)
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
      }
    }`
    const data = await request(network, query)
    const items = data.data.attesters
    if (items.length) {
      this.ingestAttesterDeployments(items)
    }
    return items.length
  }

  async ingestAttesterDeployments(_deployments) {
    const deployments = [_deployments].flat()
    this.deploymentIds = deployments.map((d) => d.attesterId)
    for (const d of deployments) {
      this.deploymentsById.set(d.attesterId, d)
    }
  }

  async loadAllSignUps(network) {
    const query = `
    {
      users (
        orderBy: blockTimestamp
      ) {
        id
        epoch
        commitment
        attesterId
      }
    }
    `
    const data = await request(network, query)
    const items = data.data.users
    this.ingestSignUps(items)
  }

  async ingestSignUps(signups) {
    for (const signup of signups) {
      const userId = signup.commitment
      const { attesterId } = signup
      if (this.signUpsByUserId.has(userId)) {
        // make sure not to insert duplicates
        const signups = this.signUpsByUserId
          .get(userId)
          .filter((s) => s.id !== signup.id)
          .push(signup)
        this.signUpsByUserId.set(signups)
      } else {
        this.signUpsByUserId.set(userId, [signup])
      }
    }
  }

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
      }
    }`
    const data = await request(network, query)
    const items = data.data.users
    if (items.length) {
      this.signUpsByUserId.set(items[0].commitment, items)
    }
    return items.length
  }

  async loadAllAttestations(network) {
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
      }
    }`
    const item = await request(network, query)
    this.ingestAttestations(item.data.attestations)
  }

  async ingestAttestations(_attestations) {
    // accept an array or a single item
    const attestations = [_attestations].flat()
    // store allAttestations as ids to prevent duplicating data
    this.attestationIds = attestations.map((a) => a.id)
    for (const a of attestations) {
      this.attestationsById.set(a.id, a)
      const { epochKey } = a
      if (this.attestationsByEpochKey.has(epochKey)) {
        const attestations = this.attestationsByEpochKey
          .get(epochKey)
          .filter((attestation) => attestation.id !== a.id)
          .push(a)
        this.attestationsByEpochKey.set(attestations)
      } else {
        this.attestationsByEpochKey.set(epochKey, [a])
      }
    }
  }

  async loadAttestationsByEpochKey(epochKey, network) {
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
      }
  }`
    const res = await request(network, query)
    const items = res.data.attestations
    if (items.length) {
      this.attestationsByEpochKey.set(items[0].epochKey, items)
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
}
