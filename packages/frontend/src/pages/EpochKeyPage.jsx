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
  const { id, network } = useParams()
  const epochKeyId = BigInt(id).toString(10)
  const { unirep, info } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      if (!info.NETWORKS[network].sumFieldCount) {
        await info.load()
      }
      !unirep.attestationsByEpochKey.has(epochKeyId)
        ? await unirep.loadAttestationsByEpochKey(
            epochKeyId,
            network,
            info.NETWORKS[network].sumFieldCount,
            info.NETWORKS[network].replNonceBits
          )
        : null
    }
    loadData()
  }, [])
  const attestations = unirep.attestationsByEpochKey.get(epochKeyId)

  return (
    <div className="content">
      <Header network={network} />
      <div className="container">
        <div className="left-container">
          <h3>Epoch Key</h3>
          {attestations ? (
            <EpochKeyInfo
              attesterId={attestations[0].attesterId}
              epoch={attestations[0].epoch}
              numAttestations={attestations.length}
              epochKey={id}
              network={network}
            />
          ) : null}
          {attestations ? null : 'Loading...'}
        </div>

        <div className="right-container">
          <h3>Attestations</h3>
          <div className="flex events-header">
            <h4>Field Index</h4>
            <h4>Change</h4>
            <h4>Timestamp</h4>
          </div>
          <div>
            {attestations
              ? attestations.map((attestation) => (
                  <EpochKeyEvent
                    key={attestation.id}
                    attestation={attestation}
                    network={network}
                  />
                ))
              : null}
            {attestations ? null : 'Loading...'}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
})
