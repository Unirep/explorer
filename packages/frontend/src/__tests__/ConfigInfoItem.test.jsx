import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import ConfigInfoItem from '../components/ConfigInfoItem'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

const renderConfigInfoItem = (item, info, text) => {
  return render(<ConfigInfoItem item={item} info={info} text={text} />)
}

test('To test if ConfigInfoItem is exactly rendered', async () => {
  renderConfigInfoItem(
    'State Tree Depth',
    1,
    'A state tree stores the updated user state after a user signs up and after a user state transition is performed'
  )

  expect(screen.getByText('State Tree Depth')).toBeInTheDocument()
})
