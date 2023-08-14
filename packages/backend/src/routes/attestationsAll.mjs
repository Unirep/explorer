import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const { network } = req.params
    const allAttestations = await db.findMany('Attestation', {
      where: {},
      orderBy: {
        index: 'desc',
      },
    })
    const items = await TimestampLoader.inject(network, allAttestations, db)
    res.json({
      items,
    })
  }
  app.get('/api/unirep/attestations', catchError(handler))
}
