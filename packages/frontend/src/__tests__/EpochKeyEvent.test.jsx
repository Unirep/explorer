import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import EpochKeyEvent from '../components/EpochKeyEvent'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderEpochKeyEvent = (attestation) => {
  return render(<EpochKeyEvent attestation={attestation} />)
}

test('To test if EpochKeyEvent is exactly rendered', async () => {
  const { container } = renderEpochKeyEvent({
    fieldIndex: 1,
    change: 1,
    timestamp: 1688393495,
  })

  expect(container.querySelector('.event-card')).not.toBeNull()
})