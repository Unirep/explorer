import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import InfoCard from './InfoCard'
import AttestationCard from './AttestationCard'
import dayjs from 'dayjs'
import './epochView.css'

export default observer(({ attesterId }) => {
  const { unirep, attester } = useContext(state)
  const { startTimestamp, epochLength } = unirep.deploymentsById.get(attesterId)
  const timeSinceDeployment = new Date() / 1000 - startTimestamp
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [nextEpoch, setNextEpoch] = useState(0)
  // const [selectedEpochActivities, setSelectedEpochActivities] = useState(0)
  const [selectedEpochAttestations, setSelectedEpochAttestations] = useState(0)
  const calculateCurrentEpoch = () => {
    const now = Math.floor(new Date() / 1000)
    const current = Math.floor((now - startTimestamp) / epochLength)
    const next = startTimestamp + epochLength * (current + 1)
    setCurrentEpoch(current)
    setNextEpoch(next)
    return current
  }
  useEffect(() => {
    const current = calculateCurrentEpoch()
    // setSelectedEpochActivities(current)
    setSelectedEpochAttestations(current)
    setTimeout(() => {
      calculateCurrentEpoch()
      setInterval(() => {
        calculateCurrentEpoch()
      }, epochLength * 1000)
    }, (epochLength - (timeSinceDeployment % epochLength)) * 1000)
  }, [])

  return (
    <>
      <div className="info-grid">
        <InfoCard heading="Current Epoch #" value1={currentEpoch} />
        <InfoCard
          heading="Next Epoch Transition Time"
          value1={dayjs(nextEpoch * 1000).format('MM-DD-YYYY HH:mm:ss')}
        />
      </div>

      <div className="flex">
        <h3>Attestations</h3>
      </div>
      <div className="flex events-header">
        <h4>Epoch key</h4>
        <div className="flex">
          <h4>Field Index</h4>
        </div>
        <div className="flex">
          <h4 style={{ minWidth: '250px', textAlign: 'right' }}>Change</h4>
        </div>
      </div>

      <div>
        {(attester.attestationsByAttesterId.get(attesterId) ?? []).map((id) => (
          <AttestationCard key={id} id={id} />
        ))}
      </div>
    </>
  )
})
