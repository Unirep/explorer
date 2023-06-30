import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import './eventCard.css'
import state from '../contexts/state'

export default observer(({ id }) => {
  const { attester } = React.useContext(state)
  const attestation = attester.attestationsById.get(id)
  const epochKeyHex = `0x${BigInt(attestation.epochKey).toString(16)}`
  const [isHover, setIsHover] = useState(false)

  const changeString = () => {
    const tmp = parseInt(BigInt(attestation.change).toString(16), 16).toString()
    const split = tmp.split('e')
    if (split.length > 1 && split[0].length > 4) {
      split[0] = split[0].slice(0, 4) + 'e'
    }
    return split.join('')
  }

  return (
    <div className="event-card">
      <Link to={`/epochKey/${epochKeyHex}`}>
        <p>{`${epochKeyHex.slice(0, 7)}...${epochKeyHex.slice(-5)}`}</p>
      </Link>
      <p>{attestation.fieldIndex} </p>
      <div
        style={{ minWidth: '100px', textAlign: 'right', position: 'relative' }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {changeString()}{' '}
        {isHover && (
          <div className="changeDetail">
            {'0x' + BigInt(attestation.change).toString(16)}
          </div>
        )}
      </div>
    </div>
  )
})
