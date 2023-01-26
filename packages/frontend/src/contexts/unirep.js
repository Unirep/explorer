import { makeAutoObservable } from 'mobx'
import { SERVER } from '../config'

export default class Unirep {
  allSignUps = []
  // signUpsByUserId = {}
  // signUpsByAttesterId = {}
  allAttestations = []
  // attestationsByAttesterId = {}
  totalPosRep = 0
  totalNegRep = 0
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
    const data = await fetch(url.toString()).then((r) => r.json())
    this.allSignUps = data
    // this.ingestSignUps(data)
  }

  // async ingestSignUps(signups) {
  //   this.signUpsByUserId = new Map()
  //   this.signUpsByAttesterId = new Map()
  //   for (let i = 0; i < signups.length; i++) {
  //     let userId = signups[i].commitment
  //     let attesterId = signups[i].attesterId
  //     if (this.signUpsByUserId.has(userId)) {
  //       this.signUpsByUserId.get(userId).push(signups[i])
  //     } else {
  //       this.signUpsByUserId.set(userId, [signups[i]])
  //     }

  //     if (this.signUpsByAttesterId.has(attesterId)) {
  //       this.signUpsByAttesterId.get(attesterId).push(signups[i])
  //     } else {
  //       this.signUpsByAttesterId.set(attesterId, [signups[i]])
  //     }
  //   }
  //   console.log('userSignups:', this.signUpsByUserId)
  //   console.log('attesterSignUps:', this.signUpsByAttesterId)
  //   console.log(
  //     'one users signups with map.get:',
  //     this.signUpsByUserId.get(
  //       '20665588589671275613306006678457435446746460926274194220015986402668071993482'
  //     )
  //   )
  // }

  async loadAllAttestations() {
    const url = new URL(`api/unirep/attestations`, SERVER)
    const data = await fetch(url.toString()).then((r) => r.json())
    this.allAttestations = data
    this.allAttestations.forEach((attestation) => {
      this.totalPosRep += attestation.posRep
      this.totalNegRep += attestation.negRep
    })
    // this.ingestAttestations(data)
  }

  // async ingestAttestations(attestations) {
  //   this.attestationsByAttesterId = new Map()
  //   for (let i = 0; i < attestations.length; i++) {
  //     let attesterId = attestations[i].attesterId
  //     if (this.attestationsByAttesterId.has(attesterId)) {
  //       this.attestationsByAttesterId.get(attesterId).push(attestations[i])
  //     } else {
  //       this.attestationsByAttesterId.set(attesterId, [attestations[i]])
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
    this.allEpochs.forEach((epoch) => {
      epoch.number === 0 && this.attesterIds.push(epoch.attesterId)
    })
    this.getCurrentAttesterStats()
    console.log('loadAllEpochs was called')
  }

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
    console.log('getCurrentAttesterStats ws called')
    console.log('stats:', this.currentAttesterStats)
  }
}
