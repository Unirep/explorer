import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import { NETWORK } from '../contexts/utils'
import './header.css'
import Menu from './Menu'
import Dropdown from './Dropdown'

export default observer(() => {
  const { unirep, ui, info } = useContext(state)
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const search = async () => {
    if (!/^(0x)?[a-fA-F0-9]*$/.test(searchInput)) {
      // invalid input, only accept hexadecimal
      // TODO: highlight the field red or something
      return
    }
    const inputAsId = BigInt(searchInput).toString(10)
    const type = await unirep.searchForId(inputAsId)
    navigate(`/${type}/${searchInput}`)
    setSearchInput('')
  }

  return (
    <div className="header">
      <Link to="/">
        {ui.isMobile ? (
          <img
            className="logo"
            src={require(`../../public/logo_notext.svg`)}
            alt="UniRep logo"
          />
        ) : (
          <img
            className="logo"
            src={require(`../../public/logo.svg`)}
            alt="UniRep logo"
          />
        )}
      </Link>
      <div className="searchbar">
        <input
          id="search"
          type="text"
          value={searchInput}
          onInput={(e) => {
            if (!/^(0x)?[a-fA-F0-9]*$/.test(e.target.value)) {
              // invalid input, only accept hexadecimal
              // TODO: highlight the field red or something
              return
            }
            setSearchInput(e.target.value)
          }}
          onKeyPress={(e) => (e.charCode === 13 ? search() : null)}
          className="input"
          placeholder={
            ui.isMobile ? 'search' : 'search by Attester/ User/ Epoch Key'
          }
        />
        <button id="go" className="go" onClick={search}>
          GO
        </button>
      </div>
      <div className="flex">
        {!ui.isMobile && (
          <Dropdown
            selected={info.network.name}
            choices={NETWORK}
            select={(n) => info.setNetwork(n)}
            disabled={window.location.pathname !== '/'}
          />
        )}
        {/* TODO: implement light/dark mode */}
        {/* <div className="link">
            <img src={require('../../public/sun_icon.svg')} alt="sun icon" />
          </div> */}
        <img
          className="menu"
          src={require('../../public/menu.svg')}
          alt="menu logo"
          onClick={() => setIsMenuOpened(true)}
        />
      </div>
      {isMenuOpened && <Menu closeMenu={() => setIsMenuOpened(false)} />}
    </div>
  )
})
