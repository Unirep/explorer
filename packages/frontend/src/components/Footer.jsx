import React, { useContext } from 'react'
import state from '../contexts/state'

export default () => {
  const { ui } = useContext(state)
  const background = require('../../public/footer_bg.svg')

  return (
    <div className="footer" style={{ backgroundImage: `url(${background})` }}>
      <a href="https://developer.unirep.io/" target="blank" className="link">
        Docs
      </a>
      <a href="https://discord.com/invite/VzMMDJmYc5" target="blank">
        Support
      </a>
      {!ui.isMobile && (
        <img src={require('../../public/logo.svg')} alt="UniRep logo" />
      )}
      <a href="https://github.com/Unirep" target="blank" className="link">
        <img src={require('../../public/github.svg')} alt="GitHub logo" />
      </a>
      <a href="https://github.com/Unirep/create-unirep-app" target="blank">
        <button>{ui.isMobile ? 'Build' : 'Build your own'}</button>
      </a>
    </div>
  )
}
