import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import EpochKey from '../pages/EpochKeyPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '0x0' }),
  useNavigate: jest.fn(),
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
    network: 'arbitrum-goerli',
  },
}

test('To test if EpochKeyPage is exactly rendered', async () => {
  renderEpochKeyPage(defaultStateData)

  expect(screen.getByText('Epoch Key')).toBeInTheDocument()
})
