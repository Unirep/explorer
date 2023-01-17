import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attester {
  signUpsByAttester = []
  attestationsByAttester = []

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
    const response = await fetch(url.toString())
    this.signUpsByAttester = await response.json()
    console.log('loadSignUpsByAttester was called')
    console.log('signUpsByAttester:', this.signUpsByAttester)
  }

  async loadAttestationsByAttester(attesterId) {
    const url = new URL(`api/attester/${attesterId}/attestations`, SERVER)
    const response = await fetch(url.toString())
    this.attestationsByAttester = await response.json()
    console.log('loadAttestationsByAttester was called')
    console.log('attestationsByAttester:', this.attestationsByAttester)
  }
}
