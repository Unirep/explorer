import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Epoch {
  number = ''
  attesterId = ''
  sealed = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  async load() {
    const url = new URL('api/epoch', SERVER)
    const response = await fetch(url.toString())
    const { number, attesterId, sealed } = await response.json()
    this.number = number
    this.attesterId = attesterId
    sealed === 1 ? (this.sealed = 'yes') : (this.sealed = 'no')
  }
}
