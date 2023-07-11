import ethers from 'ethers'
import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Unirep {
  deploymentIds = []
  deploymentsById = new Map()
  allSignUps = []
  signUpsByUserId = new Map()
  attestationsById = new Map()
  attestationsByEpochKey = new Map()
  attestationIds = []
  totalBytes = null
  attestationCount = null
  signUpCount = null
  attesterCount = null
  descriptionsByAttesterId = new Map()

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async searchForId(id) {
    const url = new URL(`api/unirep/search/${id}`, SERVER)
    const { type, data } = await fetch(url.toString()).then((r) => r.json())
    if (type === 'user') {
      this.signUpsByUserId.set(data[0].commitment, data)
    } else if (type === 'epochKey') {
      this.attestationsByEpochKey.set(data[0].epochKey, data)
    } else if (type === 'attester') {
      this.deploymentsById.set(data._id, data)
    }
    return type
  }

  async loadAttesterDeployments() {
    const url = new URL(`api/unirep/attesters`, SERVER)
    const { items } = await fetch(url.toString()).then((r) => r.json())
    this.ingestAttesterDeployments(items)
  }

  async ingestAttesterDeployments(_deployments) {
    const deployments = [_deployments].flat()
    this.deploymentIds = deployments.map((d) => d._id)
    for (const d of deployments) {
      this.deploymentsById.set(d._id, d)
    }
  }

  async loadAllSignUps() {
    const url = new URL(`api/unirep/signups`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.allSignUps = data
    this.ingestSignUps(data)
  }

  async ingestSignUps(signups) {
    for (const signup of signups) {
      const userId = signup.commitment
      const { attesterId } = signup
      if (this.signUpsByUserId.has(userId)) {
        // make sure not to insert duplicates
        const signups = this.signUpsByUserId
          .get(userId)
          .filter((s) => s._id !== signup._id)
          .push(signup)
        this.signUpsByUserId.set(signups)
      } else {
        this.signUpsByUserId.set(userId, [signup])
      }
    }
  }

  async loadSignUpsByUser(userId) {
    const url = new URL(`api/unirep/signups/${userId}`, SERVER)
    const items = await fetch(url.toString()).then((r) => r.json())
    this.signUpsByUserId.set(items[0].commitment, items)
  }

  async loadAllAttestations() {
    const url = new URL(`api/unirep/attestations`, SERVER)
    const { items } = await fetch(url.toString()).then((r) => r.json())
    this.ingestAttestations(items)
  }

  async ingestAttestations(_attestations) {
    // accept an array or a single item
    const attestations = [_attestations].flat()
    // store allAttestations as ids to prevent duplicating data
    this.attestationIds = attestations.map((a) => a._id)
    for (const a of attestations) {
      this.attestationsById.set(a._id, a)
      const { epochKey } = a
      if (this.attestationsByEpochKey.has(epochKey)) {
        const attestations = this.attestationsByEpochKey
          .get(epochKey)
          .filter((attestation) => attestation._id !== a._id)
          .push(a)
        this.attestationsByEpochKey.set(attestations)
      } else {
        this.attestationsByEpochKey.set(epochKey, [a])
      }
    }
  }

  async loadAttestationsByEpochKey(epochKey) {
    const url = new URL(`api/unirep/attestations/${epochKey}`, SERVER)
    const items = await fetch(url.toString()).then((r) => r.json())
    this.attestationsByEpochKey.set(items[0].epochKey, items)
  }

  async loadStats() {
    const url = new URL(`api/unirep/stats`, SERVER)
    const { signUpCount, attesterCount, totalBytes, attestationCount } =
      await fetch(url.toString()).then((r) => r.json())
    console.log(attestationCount)
    this.totalBytes = totalBytes
    this.attestationCount = attestationCount
    this.signUpCount = signUpCount
    this.attesterCount = attesterCount
  }

  // async updateAttesterDescription(attesterId, icon, url, name, description) {
  //   const data = await fetch(`${SERVER}/api/about/${attesterId}`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'icon': icon,
  //       'url': url,
  //       'name': name,
  //       'description': description,
  //     }
  //   }).then(r => r.json())
  //   return response
  // }

  async updateAttesterDescription(attesterId, icon, url, name, description) {
    this.descriptionsByAttesterId.set(attesterId, {icon: icon, url: url, name: name, description, description})
    return 'info updated!'
  }

  async loadAttesterDescription(attesterId) {
    const info =
      await fetch(`${SERVER}/api/about/${attesterId}`)
      .then((r) => r.json())
    this.descriptionsByAttesterId.set(attesterId, info)
  }
}
