import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '../pages/NotFound'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  matchRoutes: jest.fn(),
  useParams: jest.fn().mockReturnValue({ network: 'sepolia' }),
  Link: jest.fn(),
}))

test('To test if NotFoundPage is exactly rendered', async () => {
  render(<NotFound />)

  expect(
    screen.getByText("sorry, can't find that attester, user, or epoch key.")
  ).toBeInTheDocument()
})
