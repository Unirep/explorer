import React, { useEffect, useState } from 'react'

export default () => {
  const background = require('../../public/footer_bg.svg')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  const onWindowResize = () => {
    setIsMobile(window.innerWidth < 600)
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
  }, [])

  return (
    <div className="footer" style={{ backgroundImage: `url(${background})` }}>
      <a href="https://developer.unirep.io/" target="blank" className="link">
        Docs
      </a>
      <a href="https://discord.com/invite/VzMMDJmYc5" target="blank">
        Support
      </a>
      {!isMobile && (
        <img src={require('../../public/logo.svg')} alt="UniRep logo" />
      )}
      <a href="https://github.com/Unirep" target="blank" className="link">
        <img src={require('../../public/github.svg')} alt="GitHub logo" />
      </a>
      <a href="https://github.com/Unirep/create-unirep-app" target="blank">
        <button>{isMobile ? 'Build' : 'Build your own'}</button>
      </a>
    </div>
  )
}
