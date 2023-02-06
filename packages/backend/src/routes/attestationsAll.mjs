import catchError from '../helpers/catchError.mjs'
import loadTimestamps from '../helpers/loadTimestamps.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const allAttestations = await db.findMany('Attestation', {
      where: {},
      orderBy: {
        _id: 'desc',
      },
    })
    const items = await loadTimestamps(allAttestations, db)
    res.json({
      items,
    })
  }
  app.get('/api/unirep/attestations', catchError(handler))
}
