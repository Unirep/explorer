import catchError from '../helpers/catchError.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attesterEpochs = await db.findMany('Epoch', {
      where: {
        attesterId: BigInt(attesterId).toString(),
      },
    })
    res.json(attesterEpochs)
  }
  app.get('/api/attester/:attesterId/epochs', catchError(handler))
}
