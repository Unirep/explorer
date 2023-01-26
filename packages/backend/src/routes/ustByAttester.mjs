import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const attester = req.params.attesterId
    const attesterUST = await db.findMany('Nullifier', {
      where: {
        attesterId: attester,
      },
    })
    res.json(attesterUST)
  }
  app.get('/api/attester/:attesterId/ust', catchError(handler))
}
