import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Unirep {
  allSignUps = []
  allAttestations = []
  totalRep = 0
  allEpochs = []
  attesterIds = []
  currentAttesterStats = []

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
    if (typeof window !== 'undefined') {
      //   this.load()
    }
  }

  //   async load() {}

  async loadAllSignUps() {
    const url = new URL(`api/unirep/signups`, SERVER)
    this.allSignUps = await fetch(url.toString()).then((r) => r.json())
  }

  async loadAllAttestations() {
    const url = new URL(`api/unirep/attestations`, SERVER)
    this.allAttestations = await fetch(url.toString()).then((r) => r.json())
    this.allAttestations.forEach((attestation) => {
      this.totalRep += attestation.posRep
      this.totalRep -= attestation.negRep
    })
  }

  async loadAllEpochs() {
    const url = new URL(`api/unirep/epochs`, SERVER)
    this.allEpochs = await fetch(url.toString()).then((r) => r.json())
    this.allEpochs.forEach((epoch) => {
      epoch.number === 0 && this.attesterIds.push(epoch.attesterId)
    })
    this.getCurrentAttesterStats()
  }

  async getCurrentAttesterStats() {
    this.attesterIds.forEach((attester) => {
      let latestEpoch = 0
      let users = 0
      let posRep = 0
      let negRep = 0
      this.allEpochs.forEach((epoch) => {
        if (epoch.attesterId === attester) {
          if (epoch.number > latestEpoch) {
            latestEpoch = epoch.number
          }
        }
      })
      this.allSignUps.forEach((signup) => {
        signup.attesterId === attester && users++
      })
      this.allAttestations.forEach((attestation) => {
        if (attestation.attesterId === attester) {
          posRep += attestation.posRep
          negRep += attestation.negRep
        }
      })
      // need to get time of next epoch, add to status
      let status = {
        attesterId: attester,
        currentEpoch: latestEpoch,
        numUsers: users,
        posReputation: posRep,
        negReputation: negRep,
      }
      this.currentAttesterStats.push(status)
    })
  }
}
