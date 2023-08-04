import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Info {
  UNIREP_ADDRESS = ''
  ETH_PROVIDER_URL = ''
  VERSION = ''
  RELEASE = ''
  EMPTY_EPOCH_TREE_ROOT = ''
  AGGREGATE_KEY_COUNT = ''
  STATE_TREE_DEPTH = ''
  EPOCH_TREE_DEPTH = ''
  EPOCH_KEY_NONCE_COUNT = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  async load() {
    const url = new URL('api/info', SERVER)
    const response = await fetch(url.toString())
    const {
      UNIREP_ADDRESS,
      ETH_PROVIDER_URL,
      STATE_TREE_DEPTH,
      EPOCH_TREE_DEPTH,
      EPOCH_KEY_NONCE_COUNT,
    } = await response.json()
    this.UNIREP_ADDRESS = UNIREP_ADDRESS
    this.ETH_PROVIDER_URL = ETH_PROVIDER_URL
    this.STATE_TREE_DEPTH = STATE_TREE_DEPTH
    this.EPOCH_TREE_DEPTH = EPOCH_TREE_DEPTH
    this.EPOCH_KEY_NONCE_COUNT = EPOCH_KEY_NONCE_COUNT
  }
}
