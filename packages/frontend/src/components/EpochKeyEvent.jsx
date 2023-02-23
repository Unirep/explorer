import React from 'react'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ attestation }) => {
  const { fieldIndex, change, timestamp } = attestation

  return (
    <div className="event-card">
      {/* <p>
        {_id.slice(0, 5)}...{_id.slice(-5)}
      </p> */}
      <p>{fieldIndex}</p>
      <p style={{ minWidth: '20px' }}>{'0x' + BigInt(change).toString(16)}</p>
      <p style={{ minWidth: '100px', fontSize: '12px' }}>
        {dayjs(timestamp * 1000).from(dayjs())}
      </p>
    </div>
  )
})
