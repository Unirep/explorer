import { version } from '../config'

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

export const shiftAttestations = (
  attestations,
  sumFieldCount,
  replNonceBits
) => {
  if (!sumFieldCount || !replNonceBits) {
    throw new Error('The info is not loaded yet.')
  }

  return attestations.map((a) => {
    if (sumFieldCount && replNonceBits) {
      if (Number(a.fieldIndex) >= Number(sumFieldCount)) {
        a.change = BigInt(a.change) >> BigInt(replNonceBits)
      }
    }
    return a
  })
}
