import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import State from '../contexts/state'
import Tooltip from '../components/Tooltip'

const renderTooltip = (stateData, text) => {
  return render(
    <State.Provider value={stateData}>
      <Tooltip text={text} />
    </State.Provider>
  )
}

const defaultStateData = {
  ui: {
    isMobile: false,
  },
}

test('To test if Tooltip is exactly rendered', async () => {
  const { container } = renderTooltip(defaultStateData, 'test')

  fireEvent.mouseOver(container.querySelector('.tooltip-img'))
  await waitFor(() => container.querySelector('.tooltip-popup'))

  expect(screen.getByText('test')).toBeInTheDocument()
})
