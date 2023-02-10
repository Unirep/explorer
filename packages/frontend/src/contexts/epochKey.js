import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class EpochKey {
  attestationIds = []
  attestationsById = new Map()

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async loadAttestationsByEpochKey(epochKey) {
    const url = new URL(`api/epochKey/${epochKey}/attestations`, SERVER)
    const items = await fetch(url.toString()).then((r) => r.json())
    this.ingestAttestations(items)
  }

  async ingestAttestations(_attestations) {
    const attestations = [_attestations].flat()
    this.attestationIds = attestations.map((a) => a._id)
    for (const a of attestations) {
      this.attestationsById.set(a._id, a)
    }
  }
}
