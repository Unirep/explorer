import React from 'react'
import { observer } from 'mobx-react-lite'
import './infoCard.css'

export default observer(({ heading, value1, value2, value3 }) => {
  return (
    <div className="info-card">
      <h4>{heading}</h4>

      {value2 > -1 ? (
        <div className="flex">
          <h2>{value1}</h2>
          <div>
            <h4 className="green">Positive: +{value2}</h4>
            <h4 className="red">Negative: -{value3}</h4>
          </div>
        </div>
      ) : (
        <h2>{value1}</h2>
      )}
    </div>
  )
})
