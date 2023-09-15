import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import ConfigInfoItem from './ConfigInfoItem'
import state from '../contexts/state'
import shortenId from '../utils/shorten-id'
import { version } from '../config'
import './infoCard.css'
import { NETWORK } from '../contexts/utils'

export default observer(({ info, network }) => {
  const [circuitExpanded, setCircuitExpanded] = useState(false)
  const { ui } = React.useContext(state)

  return (
    <div className="info-card">
      <h4 className="card-heading">Protocol Information</h4>
      <div className="flex">
        <h5>Current version</h5>
        <a href="https://github.com/unirep/unirep/releases" target="_blank">
          <h6>
            <span>{version}</span>
            <span style={{ margin: '0.2rem' }} />
            <img
              src={require('../../public/arrow_up_right.svg')}
              alt="arrow up right"
            />
          </h6>
        </a>
      </div>
      <div className="flex">
        <h5>Address</h5>
        <a
          href={`${NETWORK[network].explorer}/address/${info.UNIREP_ADDRESS}`}
          target="blank"
        >
          <h6>
            <span>{shortenId(info.UNIREP_ADDRESS ?? '', ui.isMobile)}</span>
            <span style={{ margin: '0.2rem' }} />
            <img
              src={require('../../public/arrow_up_right.svg')}
              alt="arrow up right"
            />
          </h6>
        </a>
      </div>

      <div className="flex">
        <h5>Network</h5>
        <h6>{network}</h6>
      </div>

      {circuitExpanded ? (
        <>
          <div className="flex card-heading">
            <h4>Circuit Config</h4>
            <div
              onClick={() => setCircuitExpanded(false)}
              style={{ cursor: 'pointer' }}
            >
              <img src={require('../../public/arrow_up.svg')} alt="arrow up" />
            </div>
          </div>
          <ConfigInfoItem
            item="State Tree Depth"
            info={info.STATE_TREE_DEPTH}
            text="A state tree stores the updated user state after a user signs up and after a user state transition is performed"
          />
          <ConfigInfoItem
            item="Epoch Tree Depth"
            info={info.EPOCH_TREE_DEPTH}
            text="An epoch tree is used to track the reputation received by epoch keys. Non-repudiability is enforced at the circuit and smart contract level."
          />
          <ConfigInfoItem
            item="Epoch Key Nonce Count"
            info={info.EPOCH_KEY_NONCE_COUNT}
            text="The number of unique epoch keys given to each user per epoch."
          />
        </>
      ) : (
        <>
          <div className="flex card-heading">
            <h4>Circuit Config</h4>
            <div
              onClick={() => setCircuitExpanded(true)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={require('../../public/arrow_down.svg')}
                alt="arrow down"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
})
