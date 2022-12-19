import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import State from '../contexts/state'
import './home.css'

export default observer(() => {
  const { info } = useContext(State)
  return (
    <>
      <h3>UniRep Home</h3>
      <div>Connected to a server with the following info:</div>
      <ul>
        <li>Unirep Address: {info.UNIREP_ADDRESS}</li>
        <li>Provider URL: {info.ETH_PROVIDER_URL}</li>
      </ul>
    </>
  )
})
