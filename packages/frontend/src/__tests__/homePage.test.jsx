import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import Home from '../pages/Home'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  matchRoutes: jest.fn(),
  Link: jest.fn(),
}))

const renderHomePage = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <Home />
    </State.Provider>
  )
}

const defaultStateData = {
  unirep: {
    loadStats: jest.fn(),
    loadAllAttestations: jest.fn(),
    loadAttesterDeployments: jest.fn(),
    signUpCount: 1,
    attesterCount: 1,
    attestationCount: 1,
    attestationIds: ['a123'],
    attestationsById: new Map(),
    deploymentIds: ['d123'],
    deploymentsById: new Map(),
  },
  info: {
    load: jest.fn(),
    NETWORKS: {
      sepolia: {
        unirepAddress: '0x123',
      },
    },
  },
  ui: {
    isMobile: false,
  },
}

beforeAll(() => {
  defaultStateData.unirep.deploymentsById.set('d123', {
    attesterId: '0xd123',
    startTimestamp: 1688393495,
  })
  defaultStateData.unirep.attestationsById.set('a123', {
    attesterId: '0xa123',
    epochKey: '0x0',
    change: '0x1',
    startTimestamp: 1688393495,
  })
})

test('To test if HomePage is exactly rendered', async () => {
  renderHomePage(defaultStateData)

  expect(screen.getByText('Explorer')).toBeInTheDocument()
  expect(screen.getByText('Overview')).toBeInTheDocument()
  expect(screen.getByText('Total Attesters/Apps')).toBeInTheDocument()
  expect(screen.getByText('Total Sign Ups')).toBeInTheDocument()
  expect(screen.getByText('Total Attestations')).toBeInTheDocument()
  expect(screen.getByText('Total Bytes Given')).toBeInTheDocument()
  expect(screen.getByText('Latest Attester')).toBeInTheDocument()
  expect(screen.getByText('Latest Attestation')).toBeInTheDocument()
})
