import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const { network } = req.params
    const allSignUps = await db.findMany('UserSignUp', {
      where: {},
    })
    const signups = await TimestampLoader.inject(network, allSignUps, db)
    res.json(signups)
  }
  app.get('/api/unirep/signups', catchError(handler))
}
