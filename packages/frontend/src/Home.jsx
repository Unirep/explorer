import React from 'react'
import './home.css'
import { observer } from 'mobx-react-lite'
import State from './contexts/state'

export default observer(() => {
  const { info } = React.useContext(State)
  return (
    <>
      <h3>Hello World!</h3>
      <div>Connected to a server with the following info:</div>
      <ul>
        <li>Unirep Address: {info.UNIREP_ADDRESS}</li>
        <li>Provider URL: {info.ETH_PROVIDER_URL}</li>
      </ul>
    </>
  )
})
