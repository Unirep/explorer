import { NETWORK } from '../config.mjs'
import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { network } = req.headers
    res.json({
      UNIREP_ADDRESS: NETWORK[network].unirepAddress,
      ETH_PROVIDER_URL: NETWORK[network].url,
      STATE_TREE_DEPTH: synchronizer.settings.stateTreeDepth,
      EPOCH_TREE_DEPTH: synchronizer.settings.epochTreeDepth,
      EPOCH_KEY_NONCE_COUNT: synchronizer.settings.numEpochKeyNoncePerEpoch,
    })
  }
  app.get('/api/info', catchError(handler))
}
