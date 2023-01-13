import { createContext } from 'react'
import Interface from './interface'
import Info from './info'
import SignUps from './signUps'

const state = {}

const info = new Info(state)
const ui = new Interface(state)
const signups = new SignUps(state)

Object.assign(state, {
  info,
  ui,
  signups,
})

export default createContext(state)
