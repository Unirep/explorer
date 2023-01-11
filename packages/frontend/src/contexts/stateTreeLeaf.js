import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class StateTreeLeaf {
  epoch = ''
  hash = ''
  index = ''
  attesterId = ''
  _id = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  async load() {
    const url = new URL('api/stateTreeLeaf', SERVER)
    const response = await fetch(url.toString())
    const { epoch, hash, index, attesterId, _id } = await response.json()
    this.epoch = epoch
    this.hash = hash
    this.index = index
    this.attesterId = attesterId
    this.id = _id
  }
}
