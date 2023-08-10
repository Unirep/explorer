import { version } from '../config'

export const NETWORK = {
  arbitrum_goerli: {
    name: 'arbitrum-goerli',
    provider:
      'https://arb-goerli.g.alchemy.com/v2/fyuRWH9h5L_1HMJKtEJ-grnTusHIpLhz',
    explorer: 'https://goerli.arbiscan.io',
  },
  goerli: {
    name: 'goerli',
    provider:
      'https://eth-goerli.g.alchemy.com/v2/Zk0qhgeoSY-CwR7yVVCr8CPbmcW7D5hZ',
    explorer: 'https://goerli.etherscan.io',
  },
  mumbai: {
    name: 'mumbai',
    provider:
      'https://polygon-mumbai.g.alchemy.com/v2/AdwwBU55wEOwsOMrPP9molniQlRrvLQq',
    explorer: 'https://mumbai.polygonscan.com',
  },
  sepolia: {
    name: 'sepolia',
    provider:
      'https://eth-sepolia.g.alchemy.com/v2/T1LCglzEX5wDX05RPb9BU9hWhxvp04rI',
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
