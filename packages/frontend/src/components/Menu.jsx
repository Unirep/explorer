import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import { NETWORK } from '../contexts/utils'
import './Menu.css'
import Dropdown from './Dropdown'

export default observer(({ closeMenu }) => {
  const { info } = useContext(state)

  return (
    <div className="menu-container">
      <div className="close-container">
        <img
          className="close"
          src={require('../../public/close.svg')}
          alt="close image"
          onClick={closeMenu}
        />
      </div>
      <a
        className="menu-link"
        href="https://developer.unirep.io/"
        target="blank"
      >
        <img src={require('../../public/unirep-logo.svg')} alt="Unirep logo" />
        Docs
      </a>
      <a className="menu-link" href="https://github.com/Unirep" target="blank">
        <img src={require('../../public/github.svg')} alt="GitHub logo" />
        Github
      </a>
      <a
        className="menu-link"
        href="https://discord.com/invite/VzMMDJmYc5"
        target="blank"
      >
        <img src={require('../../public/discord.svg')} alt="Discord logo" />
        Discord
      </a>
      <a href="https://github.com/Unirep/create-unirep-app" target="blank">
        <button>Build</button>
      </a>
      <Dropdown
        selected={info.network}
        choices={NETWORK}
        select={(n) => info.setNetwork(n)}
        disabled={window.location.pathname !== '/'}
      />
    </div>
  )
})
