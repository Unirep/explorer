import { version } from '../config'

export const NETWORK = {
  arbitrum: {
    name: 'arbitrum-goerli',
    provider:
      'https://arb-goerli.g.alchemy.com/v2/hfFfXlX8rR8YvrALiJ8b7ZtIPRGY1GTM',
    explorer: 'https://goerli.arbiscan.io',
  },
  goerli: {
    name: 'goerli',
    provider: '',
    explorer: 'https://goerli.etherscan.io',
  },
  mumbai: {
    name: 'mumbai',
    provider: '',
    explorer: 'https://mumbai.polygonscan.com',
  },
  sepolia: {
    name: 'sepolia',
    provider: '',
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
