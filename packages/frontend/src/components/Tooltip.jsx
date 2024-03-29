import React from 'react'
import measureText from '../utils/measure-text'
import './tooltip.css'
import state from '../contexts/state'
import { observer } from 'mobx-react-lite'

export default observer(({ text, maxWidth, ...props }) => {
  const { ui } = React.useContext(state)
  const containerEl = React.createRef()
  const [timer, setTimer] = React.useState(null)
  const [showingPopup, setShowingPopup] = React.useState(false)
  const [leftOffset, setLeftOffset] = React.useState(0)
  const [textWidth, setTextWidth] = React.useState(0)

  React.useEffect(() => {
    const _textWidth = measureText(text, {
      fontSize: '12px',
      fontWeight: 'normal',
    })
    const _maxWidth = maxWidth ?? 200
    const calcWidth = Math.min(_maxWidth, _textWidth)
    setTextWidth(calcWidth)
    const { x } = containerEl.current.getBoundingClientRect()
    const screenMaxWidth = window.innerWidth - x
    const minWidth = _maxWidth + 20
    setLeftOffset(screenMaxWidth > minWidth ? 0 : minWidth - screenMaxWidth)
  })

  return (
    <div
      onMouseDown={() => {
        if (!ui.isMobile) return
        if (timer) clearTimeout(timer)
        if (showingPopup) {
          setShowingPopup(false)
          return
        }
        setShowingPopup(true)
        const _timer = setTimeout(() => {
          setShowingPopup(false)
          setTimer(null)
        }, 3000)
        setTimer(_timer)
      }}
      className="tooltip-outer"
      ref={containerEl}
      {...props}
    >
      <div
        className="tooltip-img"
        onMouseEnter={setShowingPopup.bind(null, true)}
        onMouseLeave={setShowingPopup.bind(null, false)}
      >
        <img src={require('../../public/info_icon.svg')} alt="info icon" />
      </div>
      {showingPopup && (
        <div
          className={`tooltip-popup ${ui.modeCssClass}`}
          style={{
            width: `${textWidth}px`,
            left: `-${leftOffset}px`,
          }}
        >
          <div className={`tooltip-inner ${ui.modeCssClass}`}>{text}</div>
        </div>
      )}
    </div>
  )
})
