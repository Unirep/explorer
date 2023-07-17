import { version } from '../config'

export const NETWORK = ['arbitrum-goerli', 'goerli', 'mumbai', 'sepolia']

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
