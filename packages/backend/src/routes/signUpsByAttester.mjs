import catchError from '../helpers/catchError.mjs'
import loadTimestamps from '../helpers/loadTimestamps.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attesterSignUps = await db.findMany('UserSignUp', {
      where: {
        attesterId: attesterId,
      },
    })
    const signups = await loadTimestamps(attesterSignUps, db)
    res.json(signups)
  }
  app.get('/api/attester/:attesterId/signups', catchError(handler))
}
