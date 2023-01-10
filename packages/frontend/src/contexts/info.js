import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Info {
  UNIREP_ADDRESS = ''
  ETH_PROVIDER_URL = ''
  VERSION = ''
  RELEASE = ''

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
    const { UNIREP_ADDRESS, ETH_PROVIDER_URL, VERSION, RELEASE } =
      await response.json()
    this.UNIREP_ADDRESS = UNIREP_ADDRESS
    this.ETH_PROVIDER_URL = ETH_PROVIDER_URL
    this.VERSION = VERSION
    this.RELEASE = RELEASE
  }
}
