import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attesterUST = await db.findMany('Nullifier', {
      where: {
        attesterId: attesterId,
      },
    })
    const items = await TimestampLoader.inject(attesterUST, db)
    res.json(items)
  }
  app.get('/api/attester/:attesterId/ust', catchError(handler))
}
