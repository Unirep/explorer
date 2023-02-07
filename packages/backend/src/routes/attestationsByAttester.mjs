import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attestations = await db.findMany('Attestation', {
      where: {
        attesterId: attesterId,
      },
    })
    const items = await TimestampLoader.inject(attestations, db)
    res.json(items)
  }
  app.get('/api/attester/:attesterId/attestations', catchError(handler))
}
