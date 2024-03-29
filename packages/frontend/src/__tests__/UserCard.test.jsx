import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import UserCard from '../components/UserCard'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderUserCard = (stateData, id, network) => {
  return render(
    <State.Provider value={stateData}>
      <UserCard id={id} network={network} />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    signUpsById: new Map(),
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
  defaultStateData.attester.signUpsById.set(123, {
    commitment: '123',
    epoch: 1,
  })
})

test('To test if UnirepCard is exactly rendered', async () => {
  const { container } = renderUserCard(defaultStateData, 123, 'sepolia')

  expect(container.querySelector('.event-card')).not.toBeNull()
})
