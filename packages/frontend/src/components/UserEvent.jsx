import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import state from '../contexts/state'
import shortenId from '../utils/shorten-id'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ signup }) => {
  const { ui } = useContext(state)
  const attesterIdHex = `0x${BigInt(signup.attesterId).toString(16)}`

  return (
    <div className="event-card">
      <Link to={`/attester/${attesterIdHex}`}>
        <p>{shortenId(attesterIdHex, ui.isMobile)}</p>
      </Link>
      <p>{signup.epoch}</p>
      <p>{dayjs(signup.timestamp * 1000).from(dayjs())}</p>
    </div>
  )
})
