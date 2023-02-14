import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const { data } = await db.findOne('AttesterData', {
      where: {
        _id: attesterId,
      },
    })
    const stats = JSON.parse(data)
    const attestationCount = await db.count('Attestation', {
      //   where: {
      //     attesterId: attesterId,
      //   },
    })
    res.json({
      ...stats,
      attestationCount,
    })
  }
  app.get('/api/attester/:attesterId/stats', catchError(handler))
}
