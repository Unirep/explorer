import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attester {
  epochsByAttester = []
  signUpsByAttester = []
  signUpsByEpoch = {}
  attestationsByAttester = []
  attestationsByEpoch = {}
  totalPosRep = 0
  totalNegRep = 0
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
    for (let i = 0; i < signups.length; i++) {
      let epoch = signups[i].epoch
      if (this.signUpsByEpoch.has(epoch)) {
        this.signUpsByEpoch.get(epoch).push(signups[i])
      } else {
        this.signUpsByEpoch.set(epoch, [signups[i]])
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
    this.attestationsByEpoch = new Map()
    for (let i = 0; i < attestations.length; i++) {
      let epoch = attestations[i].epoch
      if (this.attestationsByEpoch.has(epoch)) {
        this.attestationsByEpoch.get(epoch).push(attestations[i])
      } else {
        this.attestationsByEpoch.set(epoch, [attestations[i]])
      }
      this.totalPosRep += attestations[i].posRep
      this.totalNegRep += attestations[i].negRep
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
    for (let i = 0; i < USTs.length; i++) {
      let epoch = USTs[i].epoch
      if (this.ustByEpoch.has(epoch)) {
        this.ustByEpoch.get(epoch).push(USTs[i])
      } else {
        this.ustByEpoch.set(epoch, [USTs[i]])
      }
    }
    // console.log('USTs:', this.ustByEpoch.get(7))
  }
}
