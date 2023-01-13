import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class SignUps {
  allSignUps = []
  attesterSignUps = []
  userSignUps = []

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async loadAllSignUps() {
    const url = new URL(`api/signups`, SERVER)
    const response = await fetch(url.toString()).then((r) => r.json())
    console.log('..AllSignups was called')
    console.log('response: ', response)
    this.allSignUps = response
    console.log('extracted list:', this.allSignUps)
  }

  async loadSignUpsByAttester(attesterId) {
    const url = new URL(`api/signups/${attesterId}`, SERVER)
    const response = await fetch(url.toString())
    this.attesterSignUps = await response.json()
    console.log('..ByAttester was called')
  }

  async loadSignUpsByUser(userId) {
    const url = new URL(`api/signups/${userId}`, SERVER)
    const response = await fetch(url.toString())
    this.userSignUps = await response.json()
    console.log('..ByUser was called')
  }
}
