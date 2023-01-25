import {
  UNIREP_ADDRESS,
  ETH_PROVIDER_URL,
  DB_PATH,
  VERSION,
  RELEASE,
  EMPTY_EPOCH_TREE_ROOT,
  AGGREGATE_KEY_COUNT,
  STATE_TREE_DEPTH,
  EPOCH_TREE_DEPTH,
  EPOCH_TREE_ARITY,
  EPOCH_KEY_NONCE_COUNT,
} from '../config.mjs'
import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    res.json({
      UNIREP_ADDRESS,
      ETH_PROVIDER_URL,
      DB_PATH,
      VERSION,
      RELEASE,
      EMPTY_EPOCH_TREE_ROOT,
      AGGREGATE_KEY_COUNT,
      STATE_TREE_DEPTH,
      EPOCH_TREE_DEPTH,
      EPOCH_TREE_ARITY,
      EPOCH_KEY_NONCE_COUNT,
    })
  }
  app.get('/api/info', catchError(handler))
}
