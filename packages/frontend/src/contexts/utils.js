import { version, network } from '../config'

export const request = async (query) => {
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
