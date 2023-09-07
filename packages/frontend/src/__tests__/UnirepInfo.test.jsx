import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnirepInfo from '../components/UnirepInfo'

test('To test if UnirepInfo is exactly rendered', async () => {
  render(
    <UnirepInfo
      info={{
        NETWORKS: {
          'arbitrum-goerli': {
            explorer: 'https://goerli.arbiscan.io',
            unirepAddress: '0x4D137bb44553d55AE6B28B5391c6f537b06C9cc3',
            network: 'arbitrum-goerli',
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
      network={'arbitrum-goerli'}
    />
  )

  expect(screen.getByText('arbitrum-goerli')).toBeInTheDocument()
})
