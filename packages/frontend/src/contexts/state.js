import React from 'react'
import Info from './info'

const state = {}

const info = new Info(state)

Object.assign(state, {
  info,
})

export default React.createContext(state)
