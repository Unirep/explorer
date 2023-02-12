import React, { useContext, useState, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import './header.css'

export default observer(() => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')

  const search = () => {
    if (!/^(0x)?[a-fA-F0-9]*$/.test(searchInput)) {
      // invalid input, only accept hexadecimal
      // TODO: highlight the field red or something
      return
    }
    const val = BigInt(`0x${searchInput.replace('0x', '')}`)
    if (val > BigInt(2) ** BigInt(160)) {
      // it's an epoch key
      navigate(`/epochKey/${searchInput}`)
    } else {
      // otherwise treat it as an attester id
      navigate(`/attester/${searchInput}`)
    }
    setSearchInput('')
  }

  return (
    <>
      <div className="header">
        <Link to="/">
          <img src={require('../../public/logo.svg')} alt="UniRep logo" />
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
            placeholder="search by Attester/ User/ Epoch Key"
          />
          <button id="go" className="go" onClick={search}>
            GO
          </button>
        </div>
        <div className="flex">
          <a
            className="link"
            href="https://developer.unirep.io/"
            target="blank"
          >
            Docs
          </a>
          <a className="link" href="https://github.com/Unirep" target="blank">
            <img src={require('../../public/github.svg')} alt="GitHub logo" />
          </a>
          <a
            className="link"
            href="https://discord.com/invite/VzMMDJmYc5"
            target="blank"
          >
            <img src={require('../../public/discord.svg')} alt="Discord logo" />
          </a>
          <div className="link">
            <img src={require('../../public/sun_icon.svg')} alt="sun icon" />
          </div>
          <a href="https://github.com/Unirep/create-unirep-app" target="blank">
            <button>Build</button>
          </a>
        </div>
      </div>

      <Outlet />
    </>
  )
})
