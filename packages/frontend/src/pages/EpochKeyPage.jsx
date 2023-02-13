import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import EpochKeyEvent from '../components/EpochKeyEvent'
import Footer from '../components/Footer'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default observer(() => {
  const { id } = useParams()
  // const epochKeyId = BigInt(id).toString(10)
  // const { epochKey } = useContext(state)
  const { unirep } = useContext(state)
  // useEffect(() => {
  //   const loadData = async () => {
  //     // await epochKey.loadAttestationsByEpochKey(epochKeyId)
  //     await unirep.loadAllAttestations()
  //   }
  //   loadData()
  // }, [])
  // const attestationIds = epochKey.attestationIds
  const attestations = unirep.attestationsByEpochKey.get(BigInt(id).toString())

  return (
    <>
      <div className="container">
        <div className="left-container">
          <h3>Epoch Key</h3>
          <div className="info-card">
            <h4>User Information</h4>
            <div className="flex">
              <h5>Onboard to UniRep</h5>
              <h6>??</h6>
            </div>
            <div className="flex">
              <h5>Attestations Received</h5>
              <h6>{attestations ? attestations.length : 'Loading...'}</h6>
            </div>
            <div className="flex">
              <h5>Epoch Key</h5>
              <Tooltip
                text="A users' temporary, random-value-like epochKey is the receiver of attestations."
                maxWidth={200}
              />
            </div>
            <h6 className="break">{id}</h6>
          </div>
        </div>

        <div className="right-container">
          <h3>Attestations</h3>
          <div className="flex events-header">
            <h4>Attester</h4>
            <h4>Epoch #</h4>
            <h4>Sealed</h4>
            <h4>Change</h4>
            <h4>Timestamp</h4>
          </div>
          <div className="scroll">
            {/* {epochKey.attestationIds.map((id) => (
              <EpochKeyEvent key={id} id={id} />
            ))} */}
            {attestations
              ? attestations.map((attestation) => (
                  <EpochKeyEvent
                    key={attestation._id}
                    attestation={attestation}
                  />
                ))
              : null}
            {attestations ? null : 'Loading...'}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
})