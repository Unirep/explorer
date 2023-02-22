import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

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
    const url = new URL(`api/attester/${attesterId}/epochs`, SERVER)
    const items = await fetch(url.toString()).then((r) => r.json())
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
          .filter((_id) => _id !== e._id),
        e._id,
      ])
      this.epochsById.set(e._id, e)
    }
  }

  async loadSignUpsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/signups`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.ingestSignUps(data)
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
          .filter((_id) => _id !== signup._id),
        signup._id,
      ])
      this.signUpsById.set(signup._id, signup)
    }
  }

  async loadAttestationsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/attestations`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.ingestAttestations(data)
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
          .filter((_id) => _id !== attestation._id),
        attestation._id,
      ])
      this.attestationsById.set(attestation._id, attestation)
    }
  }

  async loadStats(attesterId) {
    const url = new URL(`api/attester/${attesterId}/stats`, SERVER)
    const stats = await fetch(url.toString()).then((r) => r.json())
    this.statsById = {
      [attesterId]: stats,
      ...this.statsById,
    }
  }
}
