import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ attestation }) => {
  const { attesterId, epoch, posRep, negRep, graffiti, timestamp } = attestation
  const { attester } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      await attester.loadEpochsByAttester(attesterId)
    }
    loadData()
  }, [])
  const attesterEpoch = attester.epochsByNumber.get(epoch)

  return (
    <div className="event-card">
      {attesterEpoch ? (
        attesterEpoch.sealed ? (
          <p>sealed</p>
        ) : (
          <p>not sealed</p>
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
      <p>
        {graffiti.slice(0, 5)}...{graffiti.slice(-3)}
      </p>
      <p style={{ minWidth: '100px', fontSize: '12px' }}>
        {dayjs(timestamp * 1000).from(dayjs())}
      </p>
    </div>
  )
})
