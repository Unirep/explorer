import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attester {
  signUpsByAttester = []
  signUpsByEpoch = {}
  attestationsByAttester = []
  attestationsByEpoch = {}
  totalPosRep = 0
  totalNegRep = 0
  epochsByAttester = []

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async loadSignUpsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/signups`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.signUpsByAttester = data
    this.mapSignUpsToEpoch(data)
    console.log('loadSignUpsByAttester was called')
    console.log('signUpsByAttester:', this.signUpsByAttester)
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
    console.log('signUpsByEpoch:', this.signUpsByEpoch)
  }

  async loadAttestationsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/attestations`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.attestationsByAttester = data
    this.mapAttestationsToEpoch(data)
    console.log('loadAttestationsByAttester was called')
    console.log('attestationsByAttester:', this.attestationsByAttester)
    this.attestationsByAttester.forEach((attestation) => {})
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
    console.log('attestationsByEpoch:', this.attestationsByEpoch)
  }

  async loadEpochsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/epochs`, SERVER)
    const response = await fetch(url.toString()).then((r) => r.json())
    this.epochsByAttester = response
    console.log('loadEpochsByAttester was called')
    console.log('epochs:', this.epochsByAttester)
  }
}
