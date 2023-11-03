import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Info {
  VERSION = ''
  RELEASE = ''
  NETWORKS = {
    'arbitrum-goerli': {
      explorer: '',
      unirepAddress: '',
      sumFieldCount: 1,
      replNonceBits: 1,
    },
  }
  constructor(state) {
    makeAutoObservable(this)
    this.state = state
  }

  async load() {
    const url = new URL('api/info', SERVER)
    const response = await fetch(url.toString(), {
      method: 'get',
    })

    const { NETWORKS } = await response.json()

    this.NETWORKS = {
      ...this.NETWORKS,
      ...NETWORKS,
    }
  }
}
