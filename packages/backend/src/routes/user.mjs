import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    let user = req.params.userId
    console.log(user)
    let userInfo = await db.findMany('UserSignUp', {
      where: {
        commitment: user,
      },
    })
    res.json(userInfo)
  }
  app.get('/api/user/:userId', catchError(handler))
}
