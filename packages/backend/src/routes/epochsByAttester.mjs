import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const attester = req.params.attesterId
    const attesterEpochs = await db.findMany('Epoch', {
      where: {
        attesterId: attester,
      },
    })
    res.json(attesterEpochs)
  }
  app.get('/api/attester/:attesterId/epochs', catchError(handler))
}
