import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import EpochKeyEvent from '../components/EpochKeyEvent'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const defaultStateData = {
  info: {
    NETWORKS: {
      sepolia: {
        explorer: 'https://sepolia.etherscan.io',
      },
    },
  },
}

const renderEpochKeyEvent = (attestation, network, stateData) => {
  return render(
    <State.Provider value={stateData}>
      <EpochKeyEvent attestation={attestation} network={network} />
    </State.Provider>
  )
}

test('To test if EpochKeyEvent is exactly rendered', async () => {
  const { container } = renderEpochKeyEvent(
    {
      fieldIndex: 1,
      change: 1,
      timestamp: 1688393495,
    },
    'sepolia',
    defaultStateData
  )

  expect(container.querySelector('.event-card')).not.toBeNull()
})
