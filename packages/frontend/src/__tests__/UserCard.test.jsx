import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import UserCard from '../components/UserCard'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderUserCard = (stateData, id) => {
  return render(
    <State.Provider value={stateData}>
      <UserCard id={id} />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    signUpsById: new Map(),
  },
}

beforeAll(() => {
  defaultStateData.attester.signUpsById.set(123, {
    commitment: '123',
    epoch: 1,
  })
})

test('To test if UnirepCard is exactly rendered', async () => {
  const { container } = renderUserCard(defaultStateData, 123)

  expect(container.querySelector('.event-card')).not.toBeNull()
})
