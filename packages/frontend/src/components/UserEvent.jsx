import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import state from '../contexts/state'
import shortenId from '../utils/shorten-id'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ signup, network }) => {
  const { info, ui } = useContext(state)
  const attesterIdHex = `0x${BigInt(signup.attesterId).toString(16)}`

  return (
    <div className="event-card">
      <div className="event-info">
        <Link to={`/${network}/attester/${attesterIdHex}`}>
          <p>{shortenId(attesterIdHex, ui.isMobile)}</p>
        </Link>
        <p>{signup.epoch}</p>
        <p>{dayjs(+signup.blockTimestamp * 1000).from(dayjs())}</p>
      </div>
      <a
        href={`${info.NETWORKS[network].explorer}/tx/${signup.transactionHash}`}
        target="blank"
      >
        <img src={require('../../public/arrow_up_right.svg')} />
      </a>
    </div>
  )
})
