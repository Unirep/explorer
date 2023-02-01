import React, { useContext, useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import './header.css'

export default observer(() => {
  const { unirep } = useContext(state)
  // const [userIds, setUserIds] = useState([])
  // const [attesterIds, setAttesterIds] = useState([])
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        unirep.loadAllSignUps(),
        unirep.loadAllAttestations(),
        unirep.loadAllEpochs(),
      ])
      // setUserIds(unirep.allSignUps)
      // setAttesterIds(unirep.attesterIds)
    }
    loadData()
  }, [])
  const [searchInput, setSearchInput] = useState('')

  // currently search doesn't check for any matching attester or user, just goes to 'user/searchInput'

  // const [goToPage, setGoToPage] = useState('')
  // const handleGo = () => {
  //     if (userIds.some(e => e.commitment === searchInput)) {
  //         setGoToPage(`user/${searchInput}`)
  //     } else if (attesterIds.includes(searchInput)) {
  //         setGoToPage(`attester/${searchInput}`)
  //     } else {
  //         setGoToPage('404')
  //     }
  //     setSearchInput('')
  // }

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
            onInput={(e) => setSearchInput(e.target.value)}
            className="input"
            placeholder="search by Attester/ User/ Epoch Key"
          />
          {/* <Link to={goToPage}><button id="go" className="go" onClick={() => handleGo()}>GO</button></Link> */}
          <Link to={`user/${searchInput}`}>
            <button id="go" className="go">
              GO
            </button>
          </Link>
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
