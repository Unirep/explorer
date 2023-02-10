import { createContext } from 'react'
import Interface from './interface'
import Info from './info'
import Unirep from './unirep'
import Attester from './attester'
import User from './user'
import EpochKey from './epochKey'

const state = {}

const info = new Info(state)
const ui = new Interface(state)
const unirep = new Unirep(state)
const attester = new Attester(state)
const user = new User(state)
const epochKey = new EpochKey(state)

Object.assign(state, {
  info,
  ui,
  unirep,
  attester,
  user,
  epochKey,
})

export default createContext(state)
