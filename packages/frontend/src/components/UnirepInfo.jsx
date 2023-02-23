import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import ConfigInfoItem from './ConfigInfoItem'
import './infoCard.css'
import buildNumber from '../buildnum'

export default observer(({ info }) => {
  const [circuitExpanded, setCircuitExpanded] = useState(false)

  return (
    <div className="info-card">
      <h4 className="card-heading">Protocol Information</h4>
      <div className="flex">
        <h5>Current version</h5>
        <h6>v2</h6>
      </div>
      <div className="flex">
        <h5>Release</h5>
        <h6>Feb 2023</h6>
      </div>
      <div className="flex">
        <h5>Address</h5>
        <h6>
          <span>{info.UNIREP_ADDRESS.slice(0, 7)}</span>...
          <span>{info.UNIREP_ADDRESS.slice(-5)} </span>
          <a
            href={`https://goerli.arbiscan.io/address/${info.UNIREP_ADDRESS}`}
            target="blank"
          >
            <img
              src={require('../../public/arrow_up_right.svg')}
              alt="arrow up right"
            />
          </a>
        </h6>
      </div>

      <div className="flex">
        <h5>Network</h5>
        <h6>Arbitrum / Goerli</h6>
      </div>

      {circuitExpanded ? (
        <>
          <div className="flex card-heading">
            <h4>Config</h4>
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
          {/* need this value */}
          <ConfigInfoItem
            item="Epoch Tree Arity"
            info={info.EPOCH_TREE_ARITY}
            text="The number of child nodes of each non-leaf node in the epoch tree."
          />
          <ConfigInfoItem
            item="Epoch Key Nonce Count"
            info={info.EPOCH_KEY_NONCE_COUNT}
            text="The number of unique epoch keys given to each user per epoch."
          />
          <ConfigInfoItem item="Build Number" info={buildNumber} />
        </>
      ) : (
        <>
          <div className="flex card-heading">
            <h4>Config</h4>
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
