import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'

import Attester from '../pages/AttesterPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '0x0' }),
  useNavigate: jest.fn(),
  Link: jest.fn(),
}))

const renderAttesterPage = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <Attester />
    </State.Provider>
  )
}

const defaultStateData = {
  attester: {
    statsById: new Map(),
    epochsByAttesterId: new Map(),
    epochsById: new Map(),
    loadEpochsByAttester: jest.fn(),
    loadStats: jest.fn(),
    loadSignUpsByAttester: jest.fn(),
    loadAttestationsByAttester: jest.fn(),
  },
  unirep: {
    deploymentsById: new Map(),
    loadAttesterDeployments: jest.fn(),
  },
}

beforeAll(() => {
  defaultStateData.attester.statsById.set(0, {})
})

test('To test if AttesterPage is exactly rendered', async () => {
  renderAttesterPage(defaultStateData)

  expect(screen.getByText('Attester')).toBeInTheDocument()
})
