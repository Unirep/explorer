import { UNIREP_ADDRESS, ETH_PROVIDER_URL, DB_PATH } from '../config.mjs'
import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    res.json({
      UNIREP_ADDRESS,
      ETH_PROVIDER_URL,
      DB_PATH,
    })
  }
  app.get('/api/info', catchError(handler))
}
