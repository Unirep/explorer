import { createContext } from 'react'
import Interface from './interface'
import Info from './info'
import Unirep from './unirep'
import Attester from './attester'

const state = {}

const info = new Info(state)
const ui = new Interface(state)
const unirep = new Unirep(state)
const attester = new Attester(state)

Object.assign(state, {
  info,
  ui,
  unirep,
  attester,
})

export default createContext(state)
