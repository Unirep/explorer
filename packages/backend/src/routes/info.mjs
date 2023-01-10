import {
  UNIREP_ADDRESS,
  ETH_PROVIDER_URL,
  DB_PATH,
  VERSION,
  RELEASE,
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
    })
  }
  app.get('/api/info', catchError(handler))
}
