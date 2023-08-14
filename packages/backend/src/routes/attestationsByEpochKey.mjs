import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const { epochKey, network } = req.params
    const attestations = await db.findMany('Attestation', {
      where: {
        epochKey: epochKey,
      },
    })
    const items = await TimestampLoader.inject(network, attestations, db)
    res.json(items)
  }
  app.get('/api/unirep/attestations/:epochKey', catchError(handler))
}
