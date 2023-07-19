import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import state from '../contexts/state'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import shortenId from '../utils/shorten-id'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ id }) => {
  const { unirep, ui, info } = React.useContext(state)
  const attestation = unirep.attestationsById.get(id)
  const { attesterId, blockTimestamp, transactionHash } = attestation
  const attesterIdHex = `0x${BigInt(attesterId).toString(16)}`
  const epochKeyHex = `0x${BigInt(attestation.epochKey).toString(16)}`

  return (
    <div className="event-card">
      <div className="event-info">
        <Link to={`/attester/${attesterIdHex}`}>
          <p>{shortenId(attesterIdHex, ui.isMobile)}</p>
        </Link>
        {!ui.isMobile && (
          <p style={{ minWidth: '50px', textAlign: 'center' }}>
            {attestation.epoch}
          </p>
        )}
        <Link to={`/epochKey/${epochKeyHex}`}>
          <p>{shortenId(epochKeyHex, ui.isMobile)}</p>
        </Link>
        {!ui.isMobile && (
          <p
            style={{
              width: '80px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <b>{attestation.fieldIndex}</b>:
            {'0x' + BigInt(attestation.change).toString(16)}
          </p>
        )}
        {!ui.isMobile && (
          <p style={{ minWidth: '100px', fontSize: '12px' }}>
            {dayjs(+blockTimestamp * 1000).from(dayjs())}
          </p>
        )}
      </div>
      <a href={`${info.network.explorer}/tx/${transactionHash}`} target="blank">
        <img src={require('../../public/arrow_up_right.svg')} />
      </a>
    </div>
  )
})
