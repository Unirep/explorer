import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Info {
  UNIREP_ADDRESS = ''
  ETH_PROVIDER_URL = ''
  VERSION = ''
  RELEASE = ''
  STATE_TREE_DEPTH = ''
  EPOCH_TREE_DEPTH = ''
  HISTORY_TREE_DEPTH = ''
  EPOCH_KEY_NONCE_COUNT = ''
  FIELD_COUNT = ''
  SUM_FIELD_COUNT = ''
  REPL_NONCE_BITS = ''
  REPL_FIELD_BITS = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
  }

  async load(network) {
    const url = new URL('api/info', SERVER)
    const response = await fetch(url.toString(), {
      method: 'get',
      headers: { network },
    })
    
    const {
      UNIREP_ADDRESS,
      ETH_PROVIDER_URL,
      STATE_TREE_DEPTH,
      EPOCH_TREE_DEPTH,
      HISTORY_TREE_DEPTH,
      EPOCH_KEY_NONCE_COUNT,
      FIELD_COUNT,
      SUM_FIELD_COUNT,
      REPL_NONCE_BITS,
      REPL_FIELD_BITS,
    } = await response.json()

    this.UNIREP_ADDRESS = UNIREP_ADDRESS
    this.ETH_PROVIDER_URL = ETH_PROVIDER_URL
    this.STATE_TREE_DEPTH = STATE_TREE_DEPTH
    this.EPOCH_TREE_DEPTH = EPOCH_TREE_DEPTH
    this.HISTORY_TREE_DEPTH = HISTORY_TREE_DEPTH
    this.EPOCH_KEY_NONCE_COUNT = EPOCH_KEY_NONCE_COUNT
    this.FIELD_COUNT = FIELD_COUNT
    this.SUM_FIELD_COUNT = SUM_FIELD_COUNT
    this.REPL_NONCE_BITS = REPL_NONCE_BITS
    this.REPL_FIELD_BITS = REPL_FIELD_BITS
  }
}
