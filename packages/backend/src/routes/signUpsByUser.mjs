import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { userId } = req.params
    const userSignUps = await db.findMany('UserSignUp', {
      where: {
        commitment: BigInt(userId).toString(),
      },
    })
    const signups = await TimestampLoader.inject(userSignUps, db)
    res.json(signups)
  }
  app.get('/api/unirep/signups/:userId', catchError(handler))
}
