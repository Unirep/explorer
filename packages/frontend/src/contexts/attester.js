import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attester {
  epochsByAttester = []
  signUpIds = []
  signUpsById = new Map()
  signUpsByEpoch = new Map()
  attestationsByAttester = []
  attestationsByEpoch = new Map()
  totalPosRep
  totalNegRep
  ustByAttester = []
  ustByEpoch = new Map()

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async loadEpochsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/epochs`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.epochsByAttester = data
  }

  async loadSignUpsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/signups`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.ingestSignUps(data)
  }

  async ingestSignUps(_signups) {
    const signups = [_signups].flat()
    this.signUpIds = signups.map((s) => s._id)
    for (const signup of signups) {
      this.signUpsById.set(signup._id, signup)
      const { epoch } = signup
      if (this.signUpsByEpoch.has(epoch)) {
        const signups = this.signUpsByEpoch
          .get(epoch)
          .filter((s) => s._id !== signup._id)
          .push(signup)
        this.signUpsByEpoch.set(signups)
      } else {
        this.signUpsByEpoch.set(epoch, [signup])
      }
    }
  }

  async loadAttestationsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/attestations`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.attestationsByAttester = data
    this.mapAttestationsToEpoch(data)
  }

  async mapAttestationsToEpoch(attestations) {
    this.totalPosRep = 0
    this.totalNegRep = 0
    for (const attestation of attestations) {
      let epoch = attestation.epoch
      if (this.attestationsByEpoch.has(epoch)) {
        this.attestationsByEpoch.get(epoch).push(attestation)
      } else {
        this.attestationsByEpoch.set(epoch, [attestation])
      }
      this.totalPosRep += attestation.posRep
      this.totalNegRep += attestation.negRep
    }
  }

  async loadUSTByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/ust`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.ustByAttester = data
    this.mapUSTsToEpoch(data)
  }

  async mapUSTsToEpoch(USTs) {
    for (const UST of USTs) {
      let epoch = UST.epoch
      if (this.ustByEpoch.has(epoch)) {
        this.ustByEpoch.get(epoch).push(UST)
      } else {
        this.ustByEpoch.set(epoch, [UST])
      }
    }
  }
}
