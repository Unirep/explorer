import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { attesterId } = req.params
    const attesterSignUps = await db.findMany('UserSignUp', {
      where: {
        attesterId: attesterId,
      },
    })
    const signups = await TimestampLoader.inject(attesterSignUps, db)
    res.json(signups)
  }
  app.get('/api/attester/:attesterId/signups', catchError(handler))
}
