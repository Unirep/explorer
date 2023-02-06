import catchError from '../helpers/catchError.mjs'
import loadTimestamps from '../helpers/loadTimestamps.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attestations = await db.findMany('Attestation', {
      where: {
        attesterId: attesterId,
      },
    })
    const items = await loadTimestamps(attestations, db)
    res.json(items)
  }
  app.get('/api/attester/:attesterId/attestations', catchError(handler))
}
