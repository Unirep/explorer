import { getUnirepContract } from '@unirep/contracts'
import { NETWORK } from '../config.mjs'
import catchError from '../helpers/catchError.mjs'

export default ({ app }) => {
  const handler = async (req, res) => {
    const { network } = req.headers
    if (!NETWORK[network]) {
      res.status(401).json({ error: 'Network not supported' })
      return
    }
    const { unirepAddress, provider } = NETWORK[network]
    const unirep = getUnirepContract(unirepAddress, provider)
    const config = await unirep.config()
    res.json({
      UNIREP_ADDRESS: NETWORK[network].unirepAddress,
      ETH_PROVIDER_URL: NETWORK[network].provider,
      STATE_TREE_DEPTH: config.stateTreeDepth,
      EPOCH_TREE_DEPTH: config.epochTreeDepth,
      EPOCH_KEY_NONCE_COUNT: config.numEpochKeyNoncePerEpoch,
    })
  }
  app.get('/api/info', catchError(handler))
}
