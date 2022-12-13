import { UNIREP_ADDRESS, ETH_PROVIDER_URL, DB_PATH } from '../config.mjs'

export default ({ app, db, synchronizer }) => {
  app.get('/api/info', async (req, res) => {

    try {
      res.json({
        UNIREP_ADDRESS,
        ETH_PROVIDER_URL,
        DB_PATH,
      })

    } catch (error) {
      res.status(500).json({ error })
    }

  })
}
