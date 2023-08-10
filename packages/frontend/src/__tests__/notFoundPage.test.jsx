import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import NotFound from '../pages/NotFound'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  matchRoutes: jest.fn(),
  Link: jest.fn(),
}))

test('To test if NotFoundPage is exactly rendered', async () => {
  render(<NotFound />)

  expect(
    screen.getByText("sorry, can't find that attester or user.")
  ).toBeInTheDocument()
})
