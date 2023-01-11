import { createContext } from 'react'
import Interface from './interface'
import Info from './info'
import Unirep from './unirep'
import Attestation from './attestation'
import StateTreeLeaf from './stateTreeLeaf'
import Epoch from './epoch'
import Attester from './attester'
import User from './user'

const state = {}

const info = new Info(state)
const ui = new Interface(state)
const unirep = new Unirep(state)
const attestation = new Attestation(state)
const stateTreeLeaf = new StateTreeLeaf(state)
const epoch = new Epoch(state)
// const attester = new Attester(state)
const user = new User(state)

Object.assign(state, {
  info,
  ui,
  unirep,
  attestation,
  stateTreeLeaf,
  epoch,
  // attester,
  user,
})

export default createContext(state)
