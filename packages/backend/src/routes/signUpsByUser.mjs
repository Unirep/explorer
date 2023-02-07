import catchError from '../helpers/catchError.mjs'
import loadTimestamps from '../helpers/loadTimestamps.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { userId } = req.params
    const userSignUps = await db.findMany('UserSignUp', {
      where: {
        commitment: BigInt(userId).toString(),
      },
    })
    const signups = await loadTimestamps(userSignUps, db)
    res.json(signups)
  }
  app.get('/api/user/:userId/signups', catchError(handler))
}
