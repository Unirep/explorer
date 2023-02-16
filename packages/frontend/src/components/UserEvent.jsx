import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ signup }) => {
  const attesterIdHex = `0x${BigInt(signup.attesterId).toString(16)}`
  return (
    <div className="event-card">
      <Link to={`/attester/${attesterIdHex}`}>
        <p>
          <span>{attesterIdHex.slice(0, 7)}</span>...
          <span>{attesterIdHex.slice(-5)}</span>
        </p>
      </Link>
      <p>{signup.epoch}</p>
      <p>{dayjs(signup.timestamp * 1000).from(dayjs())}</p>
    </div>
  )
})
