import axios from 'axios'
export const BlockExplorer = {
  Sepolia: 'https://api-sepolia.etherscan.io/api',
  Goerli: 'https://api-goerli.etherscan.io/api',
  Mainnet: 'https://api.etherscan.io/api',
  Polygon: 'https://api.polygonscan.com/api',
  ArbitrumGoerli: 'https://api-goerli.arbiscan.io/api',
}

export const API_KEYS = {
  Polygon: '3AQEAQZSNQ2NF6R4R8XSA6B6AQPQFZJMAJ',
  Sepolia: 'WJGMYE7AF4DTBX1TDPPB54S7E1W7VW4A5X',
  Mainnet: 'WJGMYE7AF4DTBX1TDPPB54S7E1W7VW4A5X',
  Goerli: 'WJGMYE7AF4DTBX1TDPPB54S7E1W7VW4A5X',
  ArbitrumGoerli: 'SF7Y62KJKK3XT8PN9Z6U2VVFJIFBIS7V5I',
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
