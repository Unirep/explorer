import axios from 'axios'
export const BlockExplorer = {
  Sepolia: 'https://api-sepolia.etherscan.io/api',
  Goerli: 'https://api-goerli.etherscan.io/api',
  Mainnet: 'https://api.etherscan.io/api',
  Polygon: 'https://api.polygonscan.com/api',
  ArbitrumGoerli: 'https://api-goerli.arbiscan.io/api',
}

export const API_KEYS = {
  Polygon: process.env.POLYGON_API_KEY,
  Sepolia: process.env.SEPOLIA_API_KEY,
  Mainnet: process.env.MAINNET_API_KEY,
  Goerli: process.env.GOERLI_API_KEY,
  ArbitrumGoerli: process.env.ARBITRUM_GOERLI_API_KEY,
}

export const getDeployer = async (blockExplorer, address) => {
  const apiKeyName = Object.keys(BlockExplorer).find(
    (key) => BlockExplorer[key] == blockExplorer
  )
  const apikey = API_KEYS[apiKeyName]

  if (
    [
      BlockExplorer.Goerli,
      BlockExplorer.ArbitrumGoerli,
      BlockExplorer.Sepolia,
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
    const tx = res.data.result.find((x) => x.to == '')
    return tx.from
  } else if (
    [BlockExplorer.Mainnet, BlockExplorer.Polygon].includes(blockExplorer)
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
    return res.data.result[0].contractCreator
  } else {
    return '0x'
  }
}
