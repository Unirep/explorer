import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { id } = req.params
    const deployment = await db.findOne('Attester', {
      where: {
        _id: id,
      },
    })

    const attestations = await db.findMany('Attestation', {
      where: {
        epochKey: id,
      },
    })
    const epochKeyItems = await TimestampLoader.inject(attestations, db)

    const signUps = await db.findMany('UserSignUp', {
      where: {
        commitment: id,
      },
    })
    const userItems = await TimestampLoader.inject(signUps, db)

    let type = ''
    let data = ''
    if (deployment) {
      type = 'attester'
      data = deployment
    } else if (signUps.length > 0) {
      type = 'user'
      data = userItems
    } else if (attestations.length > 0) {
      type = 'epochKey'
      data = epochKeyItems
    } else {
      type = 'unknown'
      data = null
    }
    res.json({
      type,
      data,
    })
  }
  app.get('/api/unirep/search/:id', catchError(handler))
}
