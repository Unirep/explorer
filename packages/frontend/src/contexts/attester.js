import { makeAutoObservable } from 'mobx'
import { request } from './utils'

export default class Attester {
  epochsByAttesterId = new Map()
  epochsById = new Map()

  signUpsByAttesterId = new Map()
  signUpIds = []
  signUpsById = new Map()
  signUpsByEpoch = new Map()

  attestationsByAttesterId = new Map()
  attestationsById = new Map()

  statsById = new Map()

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  epochByNumber(attesterId, number) {
    const epochId = (this.epochsByAttesterId.get(attesterId) ?? []).find(
      (epochId) => {
        return (this.epochsById.get(epochId) ?? {}).number === number
      }
    )
    return this.epochsById.get(epochId)
  }

  async loadEpochsByAttester(attesterId) {
    const query = `
    {
      epoches (
        where: {
          attesterId: "${attesterId}"
        }
        orderBy: number
      ) {
          id
          attesterId
          number
      }
  }
    `
    const data = await request(query)
    const items = data.data.epoches
    this.ingestEpochs(items)
  }

  async ingestEpochs(_epochs) {
    const epochs = [_epochs].flat()
    for (const e of epochs) {
      if (!this.epochsByAttesterId.get(e.attesterId)) {
        this.epochsByAttesterId.set(e.attesterId, [])
      }
      this.epochsByAttesterId.set(e.attesterId, [
        ...this.epochsByAttesterId
          .get(e.attesterId)
          .filter((id) => id !== e.id),
        e.id,
      ])
      this.epochsById.set(e.id, e)
    }
  }

  async loadSignUpsByAttester(attesterId) {
    const query = `
    {
      users (
        where: {
          attesterId: "${attesterId}"
        }
        orderBy: blockTimestamp
      ) {
        id
        epoch
        commitment
        attesterId
      }
    }
    `
    const data = await request(query)
    const items = data.data.users
    this.ingestSignUps(items)
  }

  async ingestSignUps(_signups) {
    const signups = [_signups].flat()
    for (const signup of signups) {
      if (!this.signUpsByAttesterId.get(signup.attesterId)) {
        this.signUpsByAttesterId.set(signup.attesterId, [])
      }
      this.signUpsByAttesterId.set(signup.attesterId, [
        ...this.signUpsByAttesterId
          .get(signup.attesterId)
          .filter((id) => id !== signup.id),
        signup.id,
      ])
      this.signUpsById.set(signup.id, signup)
    }
  }

  async loadAttestationsByAttester(attesterId) {
    // TODO: recursively query
    const query = `{
      attestations (
        orderBy: blockTimestamp
        orderDirection: desc
        attesterId: "${attesterId}"
      ) {
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
    const item = await request(query)
    this.ingestAttestations(item.data.attestations)
  }

  async ingestAttestations(_attestations) {
    const attestations = [_attestations].flat()
    for (const attestation of attestations) {
      if (!this.attestationsByAttesterId.get(attestation.attesterId)) {
        this.attestationsByAttesterId.set(attestation.attesterId, [])
      }
      this.attestationsByAttesterId.set(attestation.attesterId, [
        ...this.attestationsByAttesterId
          .get(attestation.attesterId)
          .filter((id) => id !== attestation.id),
        attestation.id,
      ])
      this.attestationsById.set(attestation.id, attestation)
    }
  }

  async loadStats(attesterId) {
    // TODO: recursively query
    const queryCount = 1000
    let bytes = 0
    const query = `
    {
      attestations (
        first: ${queryCount}
        where: {
          attesterId: "${attesterId}"
        }
    ) {
        id
        change
    }
    attesters (
      first: ${queryCount}
      where: {
        attesterId: "${attesterId}"
      }
    ) {
      id
    }
    users (
      first: ${queryCount}
      where: {
        attesterId: "${attesterId}"
      }
  ) {
      id
  }
    }
    `
    const data = await request(query)
    data.data.attestations.map((data) => {
      bytes += Math.ceil(BigInt(data.change).toString(16).length / 2)
    })
    const stats = {
      signUpCount: data.data.users.length,
      attestationCount: data.data.attestations.length,
      totalBytes: bytes,
    }
    this.statsById = {
      [attesterId]: stats,
      ...this.statsById,
    }
  }
}
