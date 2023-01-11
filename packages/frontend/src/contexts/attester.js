import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Attester {
  id = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  async load() {
    const url = new URL(`api/attester/${this.id}`, SERVER)
    const response = await fetch(url.toString())
    const { _id } = await response.json()
    this.id = _id
  }
}
