import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    let unirep = await db.findOne('SynchronizerState', {
      where: {
        attesterId: 'attester_id',
      },
    })
    res.json(unirep)
  }
  app.get('/api/unirep', catchError(handler))
}
