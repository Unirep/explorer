import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attesterUST = await db.findMany('Nullifier', {
      where: {
        attesterId: attesterId,
      },
    })
    res.json(attesterUST)
  }
  app.get('/api/attester/:attesterId/ust', catchError(handler))
}
