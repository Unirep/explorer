import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import EpochKey from '../pages/EpochKeyPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '0x0', network: 'sepolia' }),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  matchRoutes: jest.fn(),
  Link: jest.fn(),
}))

const renderEpochKeyPage = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <EpochKey />
    </State.Provider>
  )
}

const defaultStateData = {
  unirep: {
    loadAttestationsByEpochKey: jest.fn(),
    attestationsByEpochKey: new Map(),
  },
  ui: {
    isMobile: false,
  },
  info: {
    load: jest.fn(),
    NETWORKS: {
      sepolia: {
        explorer: 'https://sepolia.etherscan.io',
        sumFieldCount: 4,
        replNonceBits: 48,
      },
    },
  },
}

test('To test if EpochKeyPage is exactly rendered', async () => {
  renderEpochKeyPage(defaultStateData)

  expect(screen.getByText('Epoch Key')).toBeInTheDocument()
})
