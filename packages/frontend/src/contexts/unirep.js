import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Unirep {
  allSignUps = []
  signUpsByUserId = new Map()
  signUpsByAttesterId = new Map()
  allAttestations = []
  // attestationsByAttesterId = {}
  totalPosRep
  totalNegRep
  allEpochs = []
  attesterIds = []
  // currentAttesterStats = new Map()
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
    const data = await fetch(url.toString()).then((r) => r.json())
    this.allSignUps = data
    this.ingestSignUps(data)
  }

  async ingestSignUps(signups) {
    // this.signUpsByUserId = new Map()
    // this.signUpsByAttesterId = new Map()
    for (const signup of signups) {
      let userId = signup.commitment
      let attesterId = signup.attesterId
      if (this.signUpsByUserId.has(userId)) {
        this.signUpsByUserId.get(userId).push(signup)
      } else {
        this.signUpsByUserId.set(userId, [signup])
      }

      if (this.signUpsByAttesterId.has(attesterId)) {
        this.signUpsByAttesterId.get(attesterId).push(signup)
      } else {
        this.signUpsByAttesterId.set(attesterId, [signup])
      }
    }
    console.log('userSignups:', this.signUpsByUserId)
    console.log('attesterSignUps:', this.signUpsByAttesterId)
  }

  async loadAllAttestations() {
    const url = new URL(`api/unirep/attestations`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.allAttestations = data
    this.totalPosRep = 0
    this.totalNegRep = 0
    this.allAttestations.forEach((attestation) => {
      this.totalPosRep += attestation.posRep
      this.totalNegRep += attestation.negRep
    })
    // this.ingestAttestations(data)
  }

  // async ingestAttestations(attestations) {
  //   this.totalPosRep = 0
  //   this.totalNegRep = 0
  //   this.attestationsByAttesterId = new Map()
  //   for (const attestation of attestations) {
  //     let attesterId = attestation.attesterId
  //     if (this.attestationsByAttesterId.has(attesterId)) {
  //       this.attestationsByAttesterId.get(attesterId).push(attestation)
  //     } else {
  //       this.attestationsByAttesterId.set(attesterId, [attestation])
  //     }
  //     this.totalPosRep += attestations[i].posRep
  //     this.totalNegRep += attestations[i].negRep
  //   }
  //   console.log('attestationsByAttester:', this.attestationsByAttesterId)
  //   console.log('total rep:', this.totalNegRep, this.totalPosRep)
  // }

  async loadAllEpochs() {
    const url = new URL(`api/unirep/epochs`, SERVER)
    this.allEpochs = await fetch(url.toString()).then((r) => r.json())
    this.attesterIds = []
    this.allEpochs.forEach((epoch) => {
      epoch.number === 0 && this.attesterIds.push(epoch.attesterId)
    })
    this.getCurrentAttesterStats()
    console.log('loadAllEpochs was called')
  }

  // create array of attester stats
  getCurrentAttesterStats() {
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
    console.log('getCurrentAttesterStats was called')
    console.log('stats:', this.currentAttesterStats)
  }

  // create mapping of attester stats

  // getCurrentAttesterStats() {
  //   // this.currentAttesterStats = new Map()
  //   for (let i = 0; i < this.attesterIds.length; i++) {
  //     let latestEpoch = 0
  //     let users = 0
  //     let posRep = 0
  //     let negRep = 0
  //     this.allEpochs.forEach((epoch) => {
  //       if (epoch.attesterId === i) {
  //         if (epoch.number > latestEpoch) {
  //           latestEpoch = epoch.number
  //         }
  //       }
  //     })
  //     this.allSignUps.forEach((signup) => {
  //       if (signup.attesterId === i) {
  //         users++
  //       }
  //     })
  //     this.allAttestations.forEach((attestation) => {
  //       if (attestation.attesterId === i) {
  //         posRep += attestation.posRep
  //         negRep += attestation.negRep
  //       }
  //     })
  //     // need to get time of next epoch, add to status
  //     let status = {
  //       attesterId: i,
  //       currentEpoch: latestEpoch,
  //       numUsers: users,
  //       posReputation: posRep,
  //       negReputation: negRep,
  //     }

  //     this.currentAttesterStats.set(this.attesterIds[i], status)
  //   }
  //   console.log('getCurrentAttesterStats was called')
  //   console.log('stats map:', this.currentAttesterStats)
  // }
}
