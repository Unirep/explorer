import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Header from '../components/Header'
import EpochKeyInfo from '../components/EpochKeyInfo'
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
          {attestations ? (
            <EpochKeyInfo
              attesterId={attestations[0].attesterId}
              epoch={attestations[0].epoch}
              numAttestations={attestations.length}
              epochKey={id}
            />
          ) : null}
          {attestations ? null : 'Loading...'}
        </div>

        <div className="right-container">
          <h3>Attestations</h3>
          <div className="flex events-header">
            <h4>Transaction hash</h4>
            <h4>PosRep</h4>
            <h4>NegRep</h4>
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
