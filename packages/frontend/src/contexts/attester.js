import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attester {
  epochsByAttester = []
  epochIds = []
  epochsByNumber = new Map()

  signUpIds = []
  signUpsById = new Map()
  signUpsByEpoch = new Map()

  attestationsIds = []
  attestationsById = new Map()
  attestationsByEpoch = new Map()
  totalPosRep
  totalNegRep

  ustIds = []
  ustById = new Map()
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
    const items = await fetch(url.toString()).then((r) => r.json())
    this.epochsByAttester = items
    this.ingestEpochs(items)
  }

  async ingestEpochs(_epochs) {
    const epochs = [_epochs].flat()
    this.epochIds = epochs.map((e) => e._id)
    for (const e of epochs) {
      this.epochsByNumber.set(e.number, e)
    }
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
    this.ingestAttestations(data)
  }
  async ingestAttestations(_attestations) {
    const attestations = [_attestations].flat()
    this.attestaionIds = attestations.map((a) => a._id)
    this.totalPosRep = 0
    this.totalNegRep = 0
    for (const attestation of attestations) {
      this.attestationsById.set(attestation._id, attestation)
      const { epoch } = attestation
      if (this.attestationsByEpoch.has(epoch)) {
        const attestations = this.attestationsByEpoch
          .get(epoch)
          .filter((a) => a._id !== attestation._id)
          .push(attestation)
        this.attestationsByEpoch.set(attestations)
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
    // this.ustByAttester = data
    this.ingestUST(data)
  }

  async ingestUST(_USTs) {
    const USTs = [_USTs].flat()
    this.ustIds = USTs.map((u) => u._id)
    for (const ust of USTs) {
      this.ustById.set(ust._id, ust)
      const { epoch } = ust
      if (this.ustByEpoch.has(epoch)) {
        const usts = this.ustByEpoch
          .get(epoch)
          .filter((u) => u._id !== ust._id)
          .push(ust)
        this.ustByEpoch.set(usts)
      } else {
        this.ustByEpoch.set(epoch, [ust])
      }
    }
  }
}
