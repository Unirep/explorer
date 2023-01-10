import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attestation {
  epoch = ''
  epochKey = ''
  index = ''
  attester = ''
  attesterId = ''
  posRep = ''
  negRep = ''
  graffiti = ''
  timestamp = ''
  hash = ''
  _id = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  async load() {
    const url = new URL('api/attestation', SERVER)
    const response = await fetch(url.toString())
    const {
      epoch,
      epochKey,
      index,
      attester,
      attesterId,
      posRep,
      negRep,
      graffiti,
      timestamp,
      hash,
      _id,
    } = await response.json()
    this.epoch = epoch
    this.epochKey = epochKey
    this.index = index
    this.attester = attester
    this.attesterId = attesterId
    this.posRep = posRep
    this.negRep = negRep
    this.graffiti = graffiti
    this.timestamp = timestamp
    this.hash = hash
    this._id = _id

    // console.log('Attestation:', await response.json())
    console.log('Attestation:', this.epoch)
    console.log('Attestation:', this.attesterId)
  }
}
