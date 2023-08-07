import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import EpochKeyInfo from '../components/EpochKeyInfo'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderEpochKeyInfo = (
  stateData,
  attesterId,
  epoch,
  numAttestations,
  epochKey,
  network
) => {
  return render(
    <State.Provider value={stateData}>
      <EpochKeyInfo
        attesterId={attesterId}
        epoch={epoch}
        numAttestations={numAttestations}
        epochKey={epochKey}
        network={network}
      />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    loadEpochsByAttester: jest.fn(),
    epochByNumber: jest.fn().mockReturnValue({ sealed: true }),
  },
  ui: {
    isMobile: false,
  },
}

test('To test if EpochKeyInfo is exactly rendered', async () => {
  renderEpochKeyInfo(defaultStateData, 123, 1, 0, 'e123', 'arbitrum_goerli')

  expect(screen.getByText('Attester')).toBeInTheDocument()
})
