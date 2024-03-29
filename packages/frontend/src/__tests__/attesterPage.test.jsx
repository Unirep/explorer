import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'

import Attester from '../pages/AttesterPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '0x0', network: 'sepolia' }),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  matchRoutes: jest.fn(),
  Link: jest.fn(),
}))

const renderAttesterPage = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <Attester />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    statsById: new Map(),
    epochsByAttesterId: new Map(),
    epochsById: new Map(),
    loadEpochsByAttester: jest.fn(),
    loadStats: jest.fn(),
    loadSignUpsByAttester: jest.fn(),
    loadAttestationsByAttester: jest.fn(),
  },
  unirep: {
    descriptionsByAttesterId: new Map(),
    deploymentsById: new Map(),
    loadAttesterDescription: jest.fn(),
    loadAttesterDeployments: jest.fn(),
  },
  info: {
    load: jest.fn(),
    NETWORKS: {
      sepolia: {
        explorer: 'https://sepolia.etherscan.io',
      },
    },
  },
  ui: {
    isMobile: false,
  },
}

beforeAll(() => {
  defaultStateData.attester.statsById.set(0, {})
})

test('To test if AttesterPage is exactly rendered', async () => {
  renderAttesterPage(defaultStateData)

  expect(screen.getByText('Attester')).toBeInTheDocument()
})
