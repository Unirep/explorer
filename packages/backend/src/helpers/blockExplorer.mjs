import axios from 'axios'
export const BlockExplorer = {
  sepolia: 'https://api-sepolia.etherscan.io/api',
  goerli: 'https://api-goerli.etherscan.io/api',
  mainnet: 'https://api.etherscan.io/api',
  polygon: 'https://api.polygonscan.com/api',
  'arbitrum-goerli': 'https://api-goerli.arbiscan.io/api',
}

export const API_KEYS = {
  polygon: process.env.POLYGON_API_KEY,
  sepolia: process.env.SEPOLIA_API_KEY,
  mainnet: process.env.MAINNET_API_KEY,
  goerli: process.env.GOERLI_API_KEY,
  'arbitrum-goerli': process.env.ARBITRUM_GOERLI_API_KEY,
}

export const getDeployer = async (blockExplorer, address) => {
  const apiKeyName = Object.keys(BlockExplorer).find(
    (key) => BlockExplorer[key] == blockExplorer
  )
  const apikey = API_KEYS[apiKeyName]

  if (
    [
      BlockExplorer.goerli,
      BlockExplorer['arbitrum-goerli'],
      BlockExplorer.sepolia,
    ].includes(blockExplorer)
  ) {
    const res = await axios({
      url: blockExplorer,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      params: {
        address,
        module: 'account',
        action: 'txlist',
        startblock: 0,
        sort: 'acc',
        apikey,
      },
    })
    try {
      const tx = res.data.result.find((x) => x.to == '')
      return tx.from
    } catch {
      return '0x'
    }
  } else if (
    [BlockExplorer.mainnet, BlockExplorer.polygon].includes(blockExplorer)
  ) {
    const res = await axios({
      url: blockExplorer,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      params: {
        contractaddresses: address,
        module: 'contract',
        action: 'getcontractcreation',
        apikey,
      },
    })
    try {
      return res.data.result[0].contractCreator
    } catch {
      return '0x'
    }
  }

  return '0x'
}
