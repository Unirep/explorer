import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import Footer from '../components/Footer'

test('To test if Footer is exactly rendered', async () => {
  render(<Footer />)

  expect(screen.getByText('Docs')).toBeInTheDocument()
})
