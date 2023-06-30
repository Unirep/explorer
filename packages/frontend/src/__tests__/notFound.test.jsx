import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import NotFound from '../pages/NotFound'

// const server = setupServer(
//     rest.get('/api/unirep/attestations', (req, res, ctx) => {
//         return res(ctx.json({}))
//     })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

test('To test if NotFoundPage is exactly rendered', async () => {
  render(<NotFound />)

  expect(
    screen.getByText("sorry, can't find that attester or user.")
  ).toBeInTheDocument()
})
