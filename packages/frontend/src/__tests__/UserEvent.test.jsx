import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserEvent from '../components/UserEvent'
import State from '../contexts/state'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const defaultStateData = {
  attester: {
    signUpsById: new Map(),
  },
  ui: {
    isMobile: false,
  },
  info: {
    load: jest.fn(),
    NETWORKS: {
      sepolia: {
        explorer: 'https://sepolia.etherscan.io',
      },
    },
  },
}

beforeAll(() => {
  defaultStateData.attester.signUpsById.set(123, {
    commitment: '123',
    epoch: 1,
  })
})

test('To test if UnirepEvent is exactly rendered', async () => {
  const { container } = render(
    <State.Provider value={defaultStateData}>
      <UserEvent
        signup={{ attesterId: '123', epoch: 1, timestamp: 1688393495 }}
        network={'sepolia'}
      />
    </State.Provider>
  )

  expect(container.querySelector('.event-card')).not.toBeNull()
})
