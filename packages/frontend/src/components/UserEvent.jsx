import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import './eventCard.css'

export default observer(({ attesterId, epoch, timestamp }) => {
  return (
    <div className="event-card">
      <Link to={`/attester/${attesterId}`}>
        <p>
          0x<span>{attesterId.slice(0, 3)}</span>...
          <span>{attesterId.slice(-5)}</span>
        </p>
      </Link>
      <p>{epoch}</p>
      <p>{timestamp}</p>
    </div>
  )
})
