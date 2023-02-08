import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import state from '../contexts/state'
import './eventCard.css'

export default observer(({ id }) => {
  const { attester } = useContext(state)
  const signup = attester.signUpsById.get(id)

  return (
    <div className="event-card">
      <Link to={`/user/${signup.commitment}`}>
        <p>
          <span>{signup.commitment.slice(0, 10)}</span>...
          <span>{signup.commitment.slice(-5)}</span>
        </p>
      </Link>
      <p>{signup.epoch}</p>
    </div>
  )
})
