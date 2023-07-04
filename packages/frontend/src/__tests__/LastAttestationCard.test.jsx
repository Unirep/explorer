import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import LastAttestationCard from '../components/LastAttestationCard'

const renderLastAttestationCard = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <LastAttestationCard />
    </State.Provider>
  )
}

const defaultStateData = {
  unirep: {
    attestationIds: [],
    attestationsById: new Map(),
    attestationCount: 0,
  },
}

test('To test if LastAttestationCard is exactly rendered', async () => {
  renderLastAttestationCard(defaultStateData)

  expect(screen.getByText('Latest Attestation')).toBeInTheDocument()
})
