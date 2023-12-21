import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnirepInfo from '../components/UnirepInfo'

test('To test if UnirepInfo is exactly rendered', async () => {
  render(
    <UnirepInfo
      info={{
        NETWORKS: {
          sepolia: {
            explorer: 'https://sepolia.etherscan.io',
            unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
            network: 'sepolia',
            stateTreeDepth: 17,
            epochTreeDepth: 17,
            historyTreeDepth: 17,
            numEpochKeyNoncePerEpoch: 3,
            fieldCount: 6,
            sumFieldCount: 4,
            replNonceBits: 48,
            replFieldBits: 205,
          },
        },
      }}
      network={'sepolia'}
    />
  )

  expect(screen.getByText('sepolia')).toBeInTheDocument()
})
