import React from 'react'
import { observer } from 'mobx-react-lite'
import Tooltip from './Tooltip'
import './infoCard.css'

export default observer(({ item, info, text }) => {
  return (
    <>
      <div className="flex">
        <h5>{item}</h5>
        {text ? <Tooltip text={text} maxWidth={200} /> : null}
      </div>
      <h6 className="break">{info}</h6>
    </>
  )
})
