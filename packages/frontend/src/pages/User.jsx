import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import State from '../contexts/state'
import './user.css'

export default observer(() => {
  const { info } = useContext(State)
  const { id } = useParams()

  return (
    <>
      <h3>User {id}</h3>
      <div>Connected to a server with the following info:</div>
      <ul>
        <li>Unirep Address: {info.UNIREP_ADDRESS}</li>
        <li>Provider URL: {info.ETH_PROVIDER_URL}</li>
      </ul>
    </>
  )
})