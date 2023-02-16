import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import state from '../contexts/state'
import './eventCard.css'

export default observer(({ id }) => {
  const { attester } = useContext(state)
  const signup = attester.signUpsById.get(id)
  const commitmentHex = `0x${BigInt(signup.commitment).toString(16)}`

  return (
    <div className="event-card">
      <Link to={`/user/${commitmentHex}`}>
        <p>
          <span>{commitmentHex.slice(0, 7)}</span>...
          <span>{commitmentHex.slice(-5)}</span>
        </p>
      </Link>
      <p>{signup.epoch}</p>
    </div>
  )
})
