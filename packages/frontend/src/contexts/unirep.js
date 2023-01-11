import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Unirep {
  attesterId = ''
  latestProcessedBlock = ''
  latestProcessedTransactionIndex = ''
  latestProcessedEventIndex = ''
  latestCompleteBlock = ''
  id = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  async load() {
    const url = new URL('api/unirep', SERVER)
    const response = await fetch(url.toString())
    const {
      attesterId,
      latestProcessedBlock,
      latestProcessedTransactionIndex,
      latestProcessedEventIndex,
      latestCompleteBlock,
      _id,
    } = await response.json()
    this.attesterId = attesterId
    this.latestProcessedBlock = latestProcessedBlock
    this.latestProcessedTransactionIndex = latestProcessedTransactionIndex
    this.latestProcessedEventIndex = latestProcessedEventIndex
    this.latestCompleteBlock = latestCompleteBlock
    this.id = _id
  }
}
