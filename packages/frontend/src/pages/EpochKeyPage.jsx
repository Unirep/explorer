import React, { useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Header from '../components/Header'
import Tooltip from '../components/Tooltip'
import EpochKeyEvent from '../components/EpochKeyEvent'
import Footer from '../components/Footer'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default observer(() => {
  const { id } = useParams()
  const epochKeyId = BigInt(id).toString(10)
  const { unirep } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      !unirep.attestationsByEpochKey.has(epochKeyId)
        ? await unirep.loadAttestationsByEpochKey(epochKeyId)
        : null
    }
    loadData()
  }, [])
  const attestations = unirep.attestationsByEpochKey.get(epochKeyId)

  return (
    <body>
      <Header />
      <div className="container">
        <div className="left-container">
          <h3>Epoch Key</h3>
          <div className="info-card">
            {attestations ? (
              <>
                <div className="flex">
                  <h5>Attester</h5>
                  <Link
                    to={`/attester/0x${BigInt(
                      attestations[0].attesterId
                    ).toString(16)}`}
                  >
                    <h4>
                      <span>
                        {`0x${BigInt(attestations[0].attesterId).toString(
                          16
                        )}`.slice(0, 7)}
                      </span>
                      ...
                      <span>
                        {`0x${BigInt(attestations[0].attesterId).toString(
                          16
                        )}`.slice(-5)}
                      </span>
                    </h4>
                  </Link>
                </div>
                <div className="flex">
                  <h5>Epoch</h5>
                  <h6>{attestations[0].epoch}</h6>
                </div>
                <div className="flex">
                  <h5>Attestations Received</h5>
                  <h6>{attestations.length}</h6>
                </div>
                <div className="flex">
                  <h5>Epoch Key</h5>
                  <Tooltip
                    text="A user's temporary, random-value-like epochKey is the receiver of attestations."
                    maxWidth={200}
                  />
                </div>
                <h6 className="break">{id}</h6>
              </>
            ) : (
              'Loading...'
            )}
          </div>
        </div>

        <div className="right-container">
          <h3>Attestations</h3>
          <div className="flex events-header">
            <h4>Epoch Status</h4>
            <h4>Change</h4>
            <h4>Graffiti</h4>
            <h4>Timestamp</h4>
          </div>
          <div className="scroll">
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
    </body>
  )
})
