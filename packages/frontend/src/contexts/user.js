import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class User {
  signUpsByUser = []

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async loadSignUpsByUser(userId) {
    const url = new URL(`api/user/${userId}/signups`, SERVER)
    const response = await fetch(url.toString()).then((r) => r.json())
    console.log('loadSignUpsByUser was called')
    console.log('response: ', response)
    this.signUpsByUser = response
    console.log('signUpsByUser:', this.signUpsByUser)
  }
}
