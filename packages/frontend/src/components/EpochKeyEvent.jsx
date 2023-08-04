import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './eventCard.css'

dayjs.extend(relativeTime)

export default observer(({ attestation, explorer }) => {
  const { fieldIndex, change, blockTimestamp } = attestation
  const [isHover, setIsHover] = useState(false)

  const changeString = () => {
    const tmp = parseInt(BigInt(attestation.change).toString(16), 16).toString()
    const split = tmp.split('e')
    if (split.length > 1 && split[0].length > 4) {
      split[0] = split[0].slice(0, 4) + 'e'
    }
    return split.join('')
  }

  return (
    <div className="event-card">
      <div className="event-info">
        <p>{fieldIndex}</p>
        <div
          style={{ minWidth: '20px', position: 'relative' }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {changeString()}
          {isHover && (
            <div className="change-detail">
              {'0x' + BigInt(change).toString(16)}
            </div>
          )}
        </div>
        <p style={{ minWidth: '100px', fontSize: '12px' }}>
          {dayjs(+blockTimestamp * 1000).from(dayjs())}
        </p>
      </div>
      <a href={`${explorer}/tx/${attestation.transactionHash}`} target="blank">
        <img src={require('../../public/arrow_up_right.svg')} />
      </a>
    </div>
  )
})
