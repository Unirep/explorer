import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../components/Footer'

test('To test if Footer is exactly rendered', async () => {
  render(<Footer />)

  expect(screen.getByText('Docs')).toBeInTheDocument()
})
