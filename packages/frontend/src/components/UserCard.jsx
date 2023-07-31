import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import state from '../contexts/state'
import shortenId from '../utils/shorten-id'
import './eventCard.css'

export default observer(({ id }) => {
  const { attester, ui, info } = useContext(state)
  const signup = attester.signUpsById.get(id)
  const commitmentHex = `0x${BigInt(signup.commitment).toString(16)}`

  return (
    <div className="event-card">
      <div className="event-info">
        <Link to={`/user/${commitmentHex}`}>
          <p>{shortenId(commitmentHex, ui.isMobile)}</p>
        </Link>
        <p>{signup.epoch}</p>
      </div>
      <a
        href={`${info.network.explorer}/tx/${signup.transactionHash}`}
        target="blank"
      >
        <img src={require('../../public/arrow_up_right.svg')} />
      </a>
    </div>
  )
})
