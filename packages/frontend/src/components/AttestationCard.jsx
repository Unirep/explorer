import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import './eventCard.css'
import state from '../contexts/state'

export default observer(({ id }) => {
  const { attester } = React.useContext(state)
  const attestation = attester.attestationsById.get(id)
  const epochKeyHex = `0x${BigInt(attestation.epochKey).toString(16)}`

  return (
    <div className="event-card">
      <Link to={`/epochKey/${epochKeyHex}`}>
        <p>{`${epochKeyHex.slice(0, 7)}...${epochKeyHex.slice(-5)}`}</p>
      </Link>
      <p>{attestation.fieldIndex} </p>
      <p style={{ minWidth: '300px', textAlign: 'right' }}>
        {'0x' + BigInt(attestation.change).toString(16)}{' '}
      </p>
    </div>
  )
})
