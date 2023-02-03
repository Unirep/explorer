import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { data } = await db.findOne('GlobalData', {
      where: {
        _id: 'attestations',
      },
    })
    const stats = JSON.parse(data)
    const attestationCount = await db.count('Attestation', {})
    res.json({
      ...stats,
      attestationCount,
    })
  }
  app.get('/api/unirep/stats', catchError(handler))
}
