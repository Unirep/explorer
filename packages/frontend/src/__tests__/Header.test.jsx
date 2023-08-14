import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import Header from '../components/Header'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  matchRoutes: jest.fn(),
  Link: jest.fn(),
}))

const renderHeader = (stateData, network, setNetwork) => {
  return render(
    <State.Provider value={stateData}>
      <Header network={network} setNetwork={setNetwork} />
    </State.Provider>
  )
}

const defaultStateData = {
  unirep: {
    searchForId: jest.fn(),
  },
  ui: {
    isMobile: false,
  },
}

test('To test if Header is exactly rendered', async () => {
  renderHeader(defaultStateData, 'arbitrum-goerli', jest.fn())

  expect(screen.getByText('GO')).toBeInTheDocument()
})
