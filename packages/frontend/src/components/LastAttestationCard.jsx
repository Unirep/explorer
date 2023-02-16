import React from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import dayjs from 'dayjs'

export default observer(({ id }) => {
  const { unirep } = React.useContext(state)
  const lastAttestation = unirep.attestationsById.get(id)

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
        {lastAttestation ? null : <h5>Loading...</h5>}
      </div>
      <div className="flex">
        <h5>By Attester</h5>
        {lastAttestation ? (
          <h6>
            <span>
              {`0x${BigInt(lastAttestation.attesterId).toString(16)}`.slice(
                0,
                7
              )}
            </span>
            ...
            <span>
              {`0x${BigInt(lastAttestation.attesterId).toString(16)}`.slice(-5)}{' '}
            </span>
          </h6>
        ) : null}
        {lastAttestation ? null : <h5>Loading...</h5>}
      </div>
    </div>
  )
})
