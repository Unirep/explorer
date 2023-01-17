import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Unirep {
  allSignUps = []
  allAttestations = []
  totalRep = 0

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async loadAllSignUps() {
    const url = new URL(`api/unirep/signups`, SERVER)
    const response = await fetch(url.toString()).then((r) => r.json())
    console.log('loadAllSignups was called')
    console.log('response: ', response)
    this.allSignUps = response
    console.log('allSignUps:', this.allSignUps)
  }

  async loadAllAttestations() {
    const url = new URL(`api/unirep/attestations`, SERVER)
    this.allAttestations = await fetch(url.toString()).then((r) => r.json())
    console.log('loadAllAttestations was called')
    this.allAttestations.forEach((attestation) => {
      this.totalRep += attestation.posRep
      this.totalRep -= attestation.negRep
    })
    console.log('allAttestations:', this.allAttestations)
    console.log('total rep:', this.totalRep)
  }
}
