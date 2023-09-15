import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import EpochView from '../components/EpochView'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderEpochView = (stateData, attesterId) => {
  return render(
    <State.Provider value={stateData}>
      <EpochView attesterId={attesterId} />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    attestationsByAttesterId: new Map(),
  },
}

test('To test if EpochView is exactly rendered', async () => {
  renderEpochView(defaultStateData, 123)

  expect(screen.getByText('Epoch key')).toBeInTheDocument()
})
