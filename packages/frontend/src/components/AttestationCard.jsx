import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import './eventCard.css'
import shortenId from '../utils/shorten-id'
import state from '../contexts/state'

export default observer(({ id }) => {
  const { attester, ui, info } = React.useContext(state)
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
      <div className="event-info">
        <Link to={`/epochKey/${epochKeyHex}`}>
          <p>{shortenId(epochKeyHex, ui.isMobile)}</p>
        </Link>
        <p>{attestation.fieldIndex} </p>
        <div
          style={{
            minWidth: '100px',
            textAlign: 'right',
            position: 'relative',
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {changeString()}{' '}
          {isHover && (
            <div className="change-detail">
              {'0x' + BigInt(attestation.change).toString(16)}
            </div>
          )}
        </div>
      </div>
      <a
        href={`${info.network.explorer}/tx/${attestation.transactionHash}`}
        target="blank"
      >
        <img src={require('../../public/arrow_up_right.svg')} />
      </a>
    </div>
  )
})
