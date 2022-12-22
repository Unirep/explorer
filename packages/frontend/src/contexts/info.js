import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Info {
  UNIREP_ADDRESS = '0x1F8d7d42b44d9570e5a23F356967A55D1FC8dA26'
  ETH_PROVIDER_URL = 'https://arbitrum.goerli.unirep.io'

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
    const { UNIREP_ADDRESS, ETH_PROVIDER_URL } = await response.json()
    this.UNIREP_ADDRESS = UNIREP_ADDRESS
    this.ETH_PROVIDER_URL = ETH_PROVIDER_URL
  }
}
