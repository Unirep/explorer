import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const allAttestations = await db.findMany('Attestation', {
      where: {},
      orderBy: {
        _id: 'desc',
      },
    })
    res.json({
      items: allAttestations,
    })
  }
  app.get('/api/unirep/attestations', catchError(handler))
}
