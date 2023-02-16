import React from 'react'
import './footer.css'

export default () => {
  const background = require('../../public/footer_bg.svg')
  return (
    <div
      className="footer flex"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex">
        <a href="https://developer.unirep.io/" target="blank" className="link">
          Docs
        </a>
        <a href="https://discord.com/invite/VzMMDJmYc5" target="blank">
          Support
        </a>
      </div>
      <img src={require('../../public/logo.svg')} alt="UniRep logo" />
      <div className="flex">
        <a href="https://github.com/Unirep" target="blank" className="link">
          <img src={require('../../public/github.svg')} alt="GitHub logo" />
        </a>
        <a href="https://github.com/Unirep/create-unirep-app" target="blank">
          <button>Build your own</button>
        </a>
      </div>
    </div>
  )
}
