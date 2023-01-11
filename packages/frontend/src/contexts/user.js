import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class User {
  commitment =
    '21148151481457093107206483541042547669092147310094944251743153632587065177648'
  epoch = ''
  attesterId = ''
  id = ''
  signUps = []

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
  }

  async load() {
    // have not yet found how to pass :userId when page /user/:id is rendered
    const url = new URL(`api/user/${this.commitment}`, SERVER)
    const response = await fetch(url.toString())
    // this works to get a single sign-up with findOne:
    const { epoch, attesterId, _id } = await response.json()
    this.epoch = epoch
    this.attesterId = attesterId
    this.id = _id

    // below gets a list of sign-ups with findMany,
    // can log these values from here but trying to get them with:
    // user.signUps[0] from UserPage returns undefined.

    // this.signUps = await response.json()
    // console.log(this.signUps)
    // console.log(this.signUps[0])
    // console.log(this.signUps[0].attesterId)
    // console.log(this.signUps[0].epoch)
    // console.log(this.signUps[0]._id)
    // console.log(this.signUps.length)
  }
}
