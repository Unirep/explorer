import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import Header from '../components/Header'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: jest.fn(),
}))

const renderHeader = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <Header />
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
  info: {
    network: 'arbitrum-goerli',
  },
}

test('To test if Header is exactly rendered', async () => {
  renderHeader(defaultStateData)

  expect(screen.getByText('GO')).toBeInTheDocument()
})
