import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import './dropdown.css'

export default observer(({ selected, choices, select }) => {
  const [isDropped, setIsDropped] = useState(false)

  const onClick = (choice) => {
    setIsDropped(false)
    select(choice)
  }

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsDropped(true)}
      onMouseLeave={() => setIsDropped(false)}
    >
      {isDropped ? (
        <div
          className="drop-btn is-dropped"
          onClick={() => setIsDropped(false)}
        >
          <b>Choose Network</b>
          <img src={require('../../public/arrow-drop-down-fill.svg')} />
        </div>
      ) : (
        <div className="drop-btn" onClick={() => setIsDropped(true)}>
          <b>{selected}</b>
          <img src={require('../../public/arrow-drop-down-fill.svg')} />
        </div>
      )}
      <div
        className="dropdown-content"
        style={{ display: isDropped ? 'block' : 'none' }}
      >
        {choices.map((choice) => (
          <div
            className="dropdown-item"
            onClick={() => onClick(choice)}
            key={choice}
          >
            <b>{choice}</b>
          </div>
        ))}
      </div>
    </div>
  )
})
