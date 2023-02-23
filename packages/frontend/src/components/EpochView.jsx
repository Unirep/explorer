import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import AttestationCard from './AttestationCard'

export default observer(({ attesterId }) => {
  const { unirep, attester } = useContext(state)

  return (
    <>
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
