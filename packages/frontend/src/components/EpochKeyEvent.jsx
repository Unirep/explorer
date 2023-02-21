import React from 'react'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ attestation }) => {
  const { hash, posRep, negRep, graffiti, timestamp } = attestation

  return (
    <div className="event-card">
      <p>
        {hash.slice(0, 5)}...{hash.slice(-5)}
      </p>
      <p style={{ color: 'green', fontWeight: '600' }}>+{posRep}</p>
      <p style={{ color: 'red', fontWeight: '600' }}>-{negRep}</p>
      <p>
        {graffiti.slice(0, 5)}...{graffiti.slice(-3)}
      </p>
      <p style={{ minWidth: '100px', fontSize: '12px' }}>
        {dayjs(timestamp * 1000).from(dayjs())}
      </p>
    </div>
  )
})
