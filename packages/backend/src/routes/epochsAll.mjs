import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const allEpochs = await db.findMany('Epoch', {
      where: {},
    })
    res.json(allEpochs)
  }
  app.get('/api/unirep/epochs', catchError(handler))
}
