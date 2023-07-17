import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import state from '../contexts/state'
import Tooltip from './Tooltip'

export default observer(({ attesterId, epoch, numAttestations, epochKey }) => {
  const { attester } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      await attester.loadEpochsByAttester(attesterId)
    }
    loadData()
  }, [])
  const attesterEpoch = attester.epochByNumber(attesterId, epoch)
  const attesterIdHex = `0x${BigInt(attesterId).toString(16)}`
  return (
    <div className="info-card">
      <div className="flex">
        <h5>Attester</h5>
        <Link to={`/attester/${attesterIdHex}`}>
          <h4>
            {attesterIdHex.slice(0, 7)}...{attesterIdHex.slice(-5)}
          </h4>
        </Link>
      </div>
      <div className="flex">
        <h5>Epoch number</h5>
        <h6>{epoch}</h6>
      </div>
      <div className="flex">
        <h5>Attestations Received</h5>
        <h6>{numAttestations}</h6>
      </div>
      <div className="flex">
        <h5>Epoch Key</h5>
        <Tooltip
          text="A user's temporary, random-value-like epochKey is the receiver of attestations."
          maxWidth={200}
        />
      </div>
      <h6 className="break">{epochKey}</h6>
    </div>
  )
})
