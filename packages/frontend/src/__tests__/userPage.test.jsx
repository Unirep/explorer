import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import User from '../pages/UserPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '0x123' }),
  useNavigate: jest.fn(),
  Link: jest.fn(),
}))

const renderUserPage = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <User />
    </State.Provider>
  )
}

const defaultStateData = {
  unirep: {
    signUpsByUserId: new Map(),
    loadSignUpsByUser: jest.fn(),
  },
  ui: {
    isMobile: false,
  },
}

beforeAll(() => {
  defaultStateData.unirep.signUpsByUserId.set('0x123', {
    timestamp: 1688393495,
  })
})

test('To test if UserPage is exactly rendered', async () => {
  renderUserPage(defaultStateData)

  expect(screen.getByText('User')).toBeInTheDocument()
})
