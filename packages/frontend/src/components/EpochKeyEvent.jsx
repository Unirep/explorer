import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import state from '../contexts/state'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ attestation }) => {
  const { attesterId, epoch, posRep, negRep, timestamp } = attestation
  const { attester } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      await attester.loadEpochsByAttester(attesterId)
    }
    loadData()
  }, [])
  const attesterEpoch = attester.epochsByNumber.get(epoch)
  // const { epochKey } = React.useContext(state)
  // const attestation = epochKey.attestationsById.get(id)
  const attesterIdHex = `0x${BigInt(attesterId).toString(16)}`
  return (
    <div className="event-card">
      <Link to={`/attester/${attesterIdHex}`}>
        <p>
          <span>{attesterIdHex.slice(0, 7)}</span>...
          <span>{attesterIdHex.slice(-5)}</span>
        </p>
      </Link>
      <p style={{ minWidth: '50px', textAlign: 'center' }}>
        {attestation.epoch}
      </p>
      {attesterEpoch ? (
        attesterEpoch.sealed ? (
          <p>yes</p>
        ) : (
          <p>no</p>
        )
      ) : (
        'Loading...'
      )}
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
