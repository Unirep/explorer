import catchError from '../helpers/catchError.mjs'
import loadTimestamps from '../helpers/loadTimestamps.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attesterUST = await db.findMany('Nullifier', {
      where: {
        attesterId: attesterId,
      },
    })
    const items = await loadTimestamps(attesterUST, db)
    res.json(items)
  }
  app.get('/api/attester/:attesterId/ust', catchError(handler))
}
