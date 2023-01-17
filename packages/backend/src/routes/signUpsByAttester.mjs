import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const attester = req.params.attesterId
    console.log(attester)
    const attesterSignUps = await db.findMany('UserSignUp', {
      where: {
        attesterId: attester,
      },
    })
    res.json(attesterSignUps)
  }
  app.get('/api/attester/:attesterId/signups', catchError(handler))
}
