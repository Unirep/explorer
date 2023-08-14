import catchError from '../helpers/catchError.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const attesters = await db.findMany('Attester', {
      where: {},
    })
    res.json({
      items: attesters,
    })
  }
  app.get('/api/unirep/attesters', catchError(handler))
}
