import { createContext } from 'react'
import Info from './info'

const state = {}

const info = new Info(state)

Object.assign(state, {
  info,
})

export default createContext<any>(state)
