import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import UserEvent from '../components/UserEvent'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

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

test('To test if UnirepEvent is exactly rendered', async () => {
  const { container } = render(
    <UserEvent
      signup={{ attesterId: '123', epoch: 1, timestamp: 1688393495 }}
      network={'arbitrum'}
    />
  )

  expect(container.querySelector('.event-card')).not.toBeNull()
})
