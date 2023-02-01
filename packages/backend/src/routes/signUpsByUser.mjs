import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { userId } = req.params
    const userSignUps = await db.findMany('UserSignUp', {
      where: {
        commitment: userId,
      },
    })
    res.json(userSignUps)
  }
  app.get('/api/user/:userId/signups', catchError(handler))
}
