import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import InfoCard from './InfoCard'
import AttestationCard from './AttestationCard'
import dayjs from 'dayjs'
import './epochView.css'

export default observer(({ deployment }) => {
  const { attester } = useContext(state)
  const { startTimestamp, epochLength } = deployment
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [nextEpoch, setNextEpoch] = useState(0)
  const [selectedEpochActivities, setSelectedEpochActivities] = useState(0)
  const [selectedEpochAttestations, setSelectedEpochAttestations] = useState(0)
  const calculateCurrentEpoch = () => {
    const current = (dayjs().unix() - startTimestamp) / epochLength + 1
    const next = startTimestamp + epochLength * current
    setCurrentEpoch(Math.floor(current))
    setNextEpoch(next)
  }
  useEffect(() => {
    calculateCurrentEpoch()
    setInterval(() => {
      calculateCurrentEpoch()
    }, epochLength * 1000)
    setSelectedEpochActivities(currentEpoch)
    setSelectedEpochAttestations(currentEpoch)
  }, [])
  const signups = attester.signUpsByEpoch.get(selectedEpochActivities)
  const USTs = attester.ustByEpoch.get(selectedEpochActivities)
  const graphAttestations = attester.attestationsByEpoch.get(
    selectedEpochActivities
  )
  const listAttestations = attester.attestationsByEpoch.get(
    selectedEpochAttestations
  )
  console.log(currentEpoch)

  return (
    <>
      <div className="info-grid">
        {/* <InfoCard heading="Current Epoch #" value1={currentEpoch} /> */}
        <InfoCard heading="Current Epoch #" value1={currentEpoch} />
        <InfoCard
          heading="Next Epoch Transition Time"
          // value1={nextEpoch}
          value1={dayjs(nextEpoch * 1000).format('MM-DD-YYYY HH:mm:ss')}
        />
      </div>

      <div className="flex">
        <h3>Activities (Epoch {selectedEpochActivities})</h3>
        <div className="dropdown">
          <button className="dropbtn">Jump to epoch..</button>
          <div className="dropdown-content">
            {attester.epochsByAttester.map(({ number }) => (
              <p
                onClick={() => setSelectedEpochActivities(number)}
                key={number}
              >
                {number}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="graph-container" style={{ height: 'auto' }}>
        <ul>
          SIGNUPS THIS EPOCH: {signups ? signups.length : 0}
          {signups
            ? signups.map(({ commitment, timestamp }) => (
                <li key={commitment}>{timestamp}</li>
              ))
            : null}
          {signups ? null : <li>There were no signups in this epoch</li>}
        </ul>
        <ul>
          ATTESTATIONS THIS EPOCH:{' '}
          {graphAttestations ? graphAttestations.length : 0}
          {graphAttestations
            ? graphAttestations.map(({ epochKey, timestamp }) => (
                <li key={epochKey}>{timestamp}</li>
              ))
            : null}
          {graphAttestations ? null : (
            <li>There were no attestations in this epoch</li>
          )}
        </ul>
        <ul>
          UST THIS EPOCH: {USTs ? USTs.length : 0}
          {USTs
            ? USTs.map(({ nullifier, timestamp }) => (
                <li key={nullifier}>{timestamp}</li>
              ))
            : null}
          {USTs ? null : <li>There were no USTs in this epoch</li>}
        </ul>
      </div>

      <div className="flex">
        <h3>Attestations (Epoch {selectedEpochAttestations})</h3>
        <div className="dropdown">
          <button className="dropbtn">Jump to epoch..</button>
          <div className="dropdown-content">
            {attester.epochsByAttester.map(({ number }) => (
              <p
                onClick={() => setSelectedEpochAttestations(number)}
                key={number}
              >
                {number}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex events-header">
        <h4 style={{ width: '35%' }}>Epoch key</h4>
        <div className="flex">
          <h4>Positive Rep</h4>
          <img
            src={require('../../public/arrow_up_down.svg')}
            alt="arrow change order of display"
          />
        </div>
        <div className="flex">
          <h4>Negative Rep</h4>
          <img
            src={require('../../public/arrow_up_down.svg')}
            alt="arrow change order of display"
          />
        </div>
        <div className="flex">
          <h4>Graffiti</h4>
          <img
            src={require('../../public/arrow_up_down.svg')}
            alt="arrow change order of display"
          />
        </div>
      </div>

      <div className="scroll">
        {listAttestations
          ? listAttestations.map(
              ({ epochKey, posRep, negRep, graffiti, _id }) => (
                <AttestationCard
                  key={_id}
                  epochKey={epochKey}
                  posRep={posRep}
                  negRep={negRep}
                  graffiti={graffiti}
                />
              )
            )
          : null}
        {listAttestations ? null : 'There were no attestations in this epoch.'}
      </div>
    </>
  )
})
