import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import Home from '../pages/Home'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: jest.fn(),
}))

test('To test if HomePage is exactly rendered', async () => {
  render(<Home />)

  expect(screen.getByText('Explorer')).toBeInTheDocument()
})
