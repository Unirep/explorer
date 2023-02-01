import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attester {
  epochsByAttester = []
  signUpsByAttester = []
  signUpsByEpoch = {}
  attestationsByAttester = []
  attestationsByEpoch = {}
  totalPosRep
  totalNegRep
  ustByAttester = []
  ustByEpoch = {}

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
    this.signUpsByAttester = data
    this.mapSignUpsToEpoch(data)
  }

  async mapSignUpsToEpoch(signups) {
    this.signUpsByEpoch = new Map()
    for (const signup of signups) {
      let epoch = signup.epoch
      if (this.signUpsByEpoch.has(epoch)) {
        this.signUpsByEpoch.get(epoch).push(signup)
      } else {
        this.signUpsByEpoch.set(epoch, [signup])
      }
    }
    // console.log('signupsByEpoch:', this.signUpsByEpoch.get(0))
    // console.log('instanceof:', this.signUpsByEpoch instanceof Map)
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
    this.attestationsByEpoch = new Map()
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
    this.ustByEpoch = new Map()
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
