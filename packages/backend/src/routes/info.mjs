import { UNIREP_ADDRESS, ETH_PROVIDER_URL } from '../config.mjs'
import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    res.json({
      UNIREP_ADDRESS,
      ETH_PROVIDER_URL,
      STATE_TREE_DEPTH: synchronizer.settings.stateTreeDepth,
      EPOCH_TREE_DEPTH: synchronizer.settings.epochTreeDepth,
      EPOCH_KEY_NONCE_COUNT: synchronizer.settings.numEpochKeyNoncePerEpoch,
    })
  }
  app.get('/api/info', catchError(handler))
}
