import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import UserView from '../components/UserView'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderUserView = (stateData, attesterId) => {
  return render(
    <State.Provider value={stateData}>
      <UserView attesterId={attesterId} />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    signUpsByAttesterId: new Map(),
  },
}

test('To test if UnirepView is exactly rendered', async () => {
  renderUserView(defaultStateData, 123)

  expect(screen.getByText('Semaphore ID')).toBeInTheDocument()
})
