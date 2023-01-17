import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const allAttestations = await db.findMany('Attestation', {
      where: {},
    })
    res.json(allAttestations)
  }
  app.get('/api/unirep/attestations', catchError(handler))
}
