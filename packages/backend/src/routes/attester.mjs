import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    let attester = req.params.attesterId
    let attesterInfo = await db.findMany('UserSignUp', {
      where: {
        attesterId: attester,
      },
    })
    res.json(attesterInfo)
  }
  app.get('/api/attester/:attesterId', catchError(handler))
}
