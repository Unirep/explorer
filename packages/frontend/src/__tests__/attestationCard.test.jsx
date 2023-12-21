import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import AttestationCard from '../components/AttestationCard'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderAttestationCard = (stateData, id, network) => {
  return render(
    <State.Provider value={stateData}>
      <AttestationCard id={id} network={network} />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    attestationsById: new Map(),
  },
  ui: {
    isMobile: false,
  },
  info: {
    NETWORKS: {
      sepolia: {
        explorer: 'https://sepolia.etherscan.io',
      },
    },
  },
}

beforeAll(() => {
  defaultStateData.attester.attestationsById.set('123', {
    epochKey: 1234567890123456,
    change: 1,
  })
})

test('To test if AttesterCard is exactly rendered', async () => {
  const { container } = renderAttestationCard(
    defaultStateData,
    '123',
    'sepolia'
  )

  expect(container.querySelector('.event-card')).not.toBeNull()
})
