import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const { data } = await db.findOne('GlobalData', {
      where: {
        _id: 'attestations',
      },
    })
    const stats = JSON.parse(data)
    const attestationCount = await db.count('Attestation', {})
    const signUpCount = await db.count('UserSignUp', {})
    const attesterCount = await db.count('Attester', {})
    res.json({
      ...stats,
      attestationCount,
      signUpCount,
      attesterCount,
    })
  }
  app.get('/api/unirep/stats', catchError(handler))
}
