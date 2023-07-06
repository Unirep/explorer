import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import fetch from 'whatwg-fetch'
import UnirepInfo from '../components/UnirepInfo'

test('To test if UnirepInfo is exactly rendered', async () => {
  render(
    <UnirepInfo
      info={{
        UNIREP_ADDRESS: 'this is unirep address',
        STATE_TREE_DEPTH: 1,
        EPOCH_TREE_DEPTH: 2,
        EPOCH_TREE_ARITY: 3,
        EPOCH_KEY_NONCE_COUNT: 4,
      }}
    />
  )

  expect(screen.getByText('Arbitrum / Goerli')).toBeInTheDocument()
})
