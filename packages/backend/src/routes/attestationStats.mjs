import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { data } = await db.findOne('GlobalData', {
      where: {
        _id: 'attestations',
      },
    })
    const stats = JSON.parse(data)
    res.json(stats)
  }
  app.get('/api/unirep/stats', catchError(handler))
}
