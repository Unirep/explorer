import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attestations = await db.findMany('Attestation', {
      where: {
        attesterId: attesterId,
      },
    })
    res.json(attestations)
  }
  app.get('/api/attester/:attesterId/attestations', catchError(handler))
}
