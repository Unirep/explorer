import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const attesters = await db.findMany('Attester', {
      where: {},
    })
    res.json(attesters)
  }
  app.get('/api/unirep/attesters', catchError(handler))
}
