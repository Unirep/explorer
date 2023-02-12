import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { id } = req.params
    const deployment = await db.findOne('Attester', {
      where: {
        _id: id,
      },
    })
    const attestation = await db.findOne('Attestation', {
      where: {
        epochKey: id,
      },
    })
    const signUp = await db.findOne('UserSignUp', {
      where: {
        commitment: id,
      },
    })
    let type = ''
    if (deployment) {
      type = 'attester'
    } else if (attestation) {
      type = 'epochKey'
    } else if (signUp) {
      type = 'user'
    } else {
      type = 'unknown'
    }
    res.json(type)
  }
  app.get('/api/unirep/search/:id', catchError(handler))
}
