import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import './eventCard.css'

export default observer(({ attestation }) => {
  const epochKeyHex = `0x${BigInt(attestation.epochKey).toString(16)}`

  return (
    <div className="event-card">
      <Link to={`/epochKey/${epochKeyHex}`}>
        <p>{`${epochKeyHex.slice(0, 7)}...${epochKeyHex.slice(-5)}`}</p>
      </Link>
      <p style={{ color: 'green' }}>+{attestation.posRep}</p>
      <p style={{ color: 'red' }}>-{attestation.negRep}</p>
      <p>{attestation.graffiti} </p>
    </div>
  )
})
