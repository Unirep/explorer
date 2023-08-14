import catchError from '../helpers/catchError.mjs'
import { TimestampLoader } from '../helpers/timestampLoader.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const { id, network } = req.params
    const deployment = await db.findOne('Attester', {
      where: {
        _id: id,
      },
    })
    if (deployment) {
      res.json({ type: 'attester', data: deployment })
      return
    }

    const attestations = await db.findMany('Attestation', {
      where: {
        epochKey: id,
      },
    })
    if (attestations.length > 0) {
      const epochKeyItems = await TimestampLoader.inject(
        network,
        attestations,
        db
      )
      res.json({ type: 'epochKey', data: epochKeyItems })
      return
    }

    const signUps = await db.findMany('UserSignUp', {
      where: {
        commitment: id,
      },
    })
    if (signUps.length > 0) {
      const userItems = await TimestampLoader.inject(signUps, db)
      res.json({ type: 'user', data: userItems })
      return
    }

    res.json({ type: 'unknown', data: null })
  }
  app.get('/api/unirep/search/:id', catchError(handler))
}
