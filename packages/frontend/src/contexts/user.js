import { makeAutoObservable } from 'mobx'
import { useParams } from 'react-router-dom'

import { userId } from '../pages/UserPage'
import { SERVER } from '../config'

export default class User {
  //   const { id } = useParams()
  //   id = useParams()
  id = '-2gEJ-skQOJB666hUyacS'
  //   id = ''
  commitment = ''
  epoch = ''
  attesterId = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      this.load()
    }
    // const { id } = useParams()
    // this.userId = id
  }

  async load() {
    const url = new URL(`api/user/${this.id}`, SERVER)
    const response = await fetch(url.toString())
    const { commitment, epoch, attesterId } = await response.json()
    this.commitment = commitment
    this.epoch = epoch
    this.attesterId = attesterId
  }
}
