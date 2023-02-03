import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import state from '../contexts/state'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ id }) => {
  const { unirep } = React.useContext(state)
  const attestation = unirep.attestationsByIndex.get(id)
  const { attesterId, posRep, negRep, timestamp } = attestation
  const attesterIdHex = `0x${BigInt(attesterId).toString(16)}`
  const epochKeyHex = `0x${BigInt(attestation.epochKey).toString(16)}`
  return (
    <div className="event-card">
      <Link to={`attester/${attesterIdHex}`}>
        <p>
          <span>{attesterIdHex.slice(0, 7)}</span>...
          <span>{attesterIdHex.slice(-5)}</span>
        </p>
      </Link>
      <p style={{ minWidth: '50px', textAlign: 'center' }}>
        {attestation.epoch}
      </p>
      <Link to={`user/${epochKeyHex}`}>
        <p>{`${epochKeyHex.slice(0, 7)}...${epochKeyHex.slice(-5)}`}</p>
      </Link>
      <p style={{ minWidth: '80px' }}>
        {posRep - negRep}
        <span style={{ fontSize: '12px', fontWeight: '600' }}>
          <span style={{ color: 'green' }}>+{posRep}</span>/
          <span style={{ color: 'red' }}>-{negRep}</span>
        </span>
      </p>
      <p style={{ minWidth: '100px', fontSize: '12px' }}>
        {dayjs(timestamp * 1000).from(dayjs())}
      </p>
    </div>
  )
})
