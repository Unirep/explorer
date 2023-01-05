import { createContext } from 'react'
import Info from './info'
import Interface from './interface'

const state = {}

const info = new Info(state)
const ui = new Interface(state)

Object.assign(state, {
  info,
  ui,
})

export default createContext(state)
