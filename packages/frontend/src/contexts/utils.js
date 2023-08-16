import { version } from '../config'

export const NETWORK = {
  'arbitrum-goerli': {
    explorer: 'https://goerli.arbiscan.io',
  },
  goerli: {
    explorer: 'https://goerli.etherscan.io',
  },
  mumbai: {
    explorer: 'https://mumbai.polygonscan.com',
  },
  sepolia: {
    explorer: 'https://sepolia.etherscan.io',
  },
}

export const request = async (network, query) => {
  const url = `https://api.studio.thegraph.com/query/48080/${network}/${version}`
  const res = await fetch(url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      query: query,
    }),
  }).then((res) => res.json())
  return res
}

export const shiftAttestations = async (
  attestations,
  SUM_FIELD_COUNT,
  REPL_NONCE_BITS
) => {
  if (!SUM_FIELD_COUNT || !REPL_NONCE_BITS) {
    throw new Error('The info is not loaded yet.')
  }

  return attestations.map((a) => {
    if (SUM_FIELD_COUNT && REPL_NONCE_BITS) {
      if (Number(a.fieldIndex) >= Number(SUM_FIELD_COUNT)) {
        a.change = BigInt(a.change) >> BigInt(REPL_NONCE_BITS)
      }
    }
    return a
  })
}
