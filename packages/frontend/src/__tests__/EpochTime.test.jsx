import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EpochTime from '../components/EpochTime'

const renderEpochTime = (deployment) => {
  return render(<EpochTime deployment={deployment} />)
}

test('To test if EpochTime is exactly rendered', async () => {
  renderEpochTime({
    startTimestamp: 1688393495,
    epochLength: 150,
  })

  expect(screen.getByText('Next Epoch Transition Time')).toBeInTheDocument()
})
