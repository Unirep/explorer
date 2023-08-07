import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import './dropdown.css'

export default observer(({ selected, choices, select, disabled = false }) => {
  const [isDropped, setIsDropped] = useState(false)

  const onClick = (choice) => {
    setIsDropped(false)
    select(choice)
  }

  const drop = () => {
    if (disabled) return
    setIsDropped(true)
  }

  return (
    <div
      className="dropdown"
      onMouseEnter={drop}
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
        <div className={`drop-btn ${disabled && 'disabled'}`} onClick={drop}>
          <b>{selected.replace('_', '-')}</b>
          <img src={require('../../public/arrow-drop-down-fill.svg')} />
        </div>
      )}
      <div
        className="dropdown-content"
        style={{ display: isDropped ? 'block' : 'none' }}
      >
        {choices.map((c) => (
          <div className="dropdown-item" onClick={() => onClick(c)} key={c}>
            <b>{c.replace('_', '-')}</b>
          </div>
        ))}
      </div>
    </div>
  )
})
