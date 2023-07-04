import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import UnirepEvent from '../components/UnirepEvent'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderUnirepEvent = (stateData, id) => {
  return render(
    <State.Provider value={stateData}>
      <UnirepEvent id={id} />
    </State.Provider>
  )
}

const defaultStateData = {
  unirep: {
    attestationsById: new Map(),
  },
}

beforeAll(() => {
  defaultStateData.unirep.attestationsById.set(123, {
    attesterId: '123',
    timestamp: 1688393495,
    epochKey: '123',
    fieldIndex: 1,
    change: 1,
    epoch: 1,
  })
})

test('To test if UnirepEvent is exactly rendered', async () => {
  const { container } = renderUnirepEvent(defaultStateData, 123)

  expect(container.querySelector('.event-card')).not.toBeNull()
})
