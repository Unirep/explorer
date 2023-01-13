import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const user = req.params.userId
    console.log(user)
    const userSignUps = await db.findOne('UserSignUp', {
      where: {
        commitment: user,
      },
    })
    res.json(userSignUps)
  }
  app.get('/api/signups/:userId', catchError(handler))
}
