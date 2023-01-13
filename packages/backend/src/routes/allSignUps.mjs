import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const allSignUps = await db.findMany('UserSignUp', {
      where: {},
    })
    res.json(allSignUps)
  }
  app.get('/api/signups', catchError(handler))
}
