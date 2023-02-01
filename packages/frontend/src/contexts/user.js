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
    const data = await fetch(url.toString()).then((r) => r.json())
    this.signUpsByUser = data
  }
}
