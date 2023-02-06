import catchError from '../helpers/catchError.mjs'
import loadTimestamps from '../helpers/loadTimestamps.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const allSignUps = await db.findMany('UserSignUp', {
      where: {},
    })
    const signups = await loadTimestamps(allSignUps, db)
    res.json(signups)
  }
  app.get('/api/unirep/signups', catchError(handler))
}
