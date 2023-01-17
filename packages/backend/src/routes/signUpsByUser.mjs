import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const user = req.params.userId
    console.log(user)
    const userSignUps = await db.findMany('UserSignUp', {
      where: {
        commitment: user,
      },
    })
    res.json(userSignUps)
  }
  app.get('/api/user/:userId/signups', catchError(handler))
}
