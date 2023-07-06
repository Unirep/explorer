import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import State from '../contexts/state'
import LastDeploymentCard from '../components/LastDeploymentCard'

const renderLastDeploymentCard = (stateData) => {
  return render(
    <State.Provider value={stateData}>
      <LastDeploymentCard />
    </State.Provider>
  )
}

const defaultStateData = {
  unirep: {
    deploymentIds: [],
    deploymentsById: new Map(),
    attestationCount: 0,
  },
}

test('To test if LastDeploymentCard is exactly rendered', async () => {
  renderLastDeploymentCard(defaultStateData)

  expect(screen.getByText('Latest Attester')).toBeInTheDocument()
})
