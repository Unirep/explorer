import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attesterSignUps = await db.findMany('UserSignUp', {
      where: {
        attesterId: attesterId,
      },
    })
    res.json(attesterSignUps)
  }
  app.get('/api/attester/:attesterId/signups', catchError(handler))
}
