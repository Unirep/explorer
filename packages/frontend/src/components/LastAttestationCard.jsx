import React from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import dayjs from 'dayjs'
import shortenId from '../utils/shorten-id'

export default observer(() => {
  const { unirep, ui } = React.useContext(state)
  const id = unirep.attestationIds.slice(-1)[0]
  const lastAttestation = unirep.attestationsById.get(id)
  const { attestationCount } = unirep

  return (
    <div className="info-card">
      <h4>Latest Attestation</h4>
      <div className="flex">
        <h5>Submitted</h5>
        {lastAttestation ? (
          <h6>
            {dayjs(lastAttestation.timestamp * 1000).format('MMM D, YYYY')}
          </h6>
        ) : null}
        {attestationCount === null ? <h5>Loading...</h5> : null}
        {attestationCount === 0 ? <h5>No attestations</h5> : null}
      </div>
      <div className="flex">
        <h5>By Attester</h5>
        {lastAttestation ? (
          <h6>
            {shortenId(
              `0x${BigInt(lastAttestation.attesterId).toString(16)}`,
              ui.isMobile
            )}
          </h6>
        ) : null}
        {attestationCount === null ? <h5>Loading...</h5> : null}
        {attestationCount === 0 ? <h5>No attestations</h5> : null}
      </div>
    </div>
  )
})
