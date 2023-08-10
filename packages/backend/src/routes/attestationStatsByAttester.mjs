import catchError from '../helpers/catchError.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const attesterId = BigInt(req.params.attesterId).toString()
    const attester = await db.findOne('AttesterData', {
      where: {
        _id: attesterId,
      },
    })
    const stats = attester ? JSON.parse(attester.data) : {}
    const attestationCount = await db.count('Attestation', {
      attesterId,
    })
    const signUpCount = await db.count('UserSignUp', {
      attesterId,
    })
    res.json({
      ...stats,
      attestationCount,
      signUpCount,
    })
  }
  app.get('/api/attester/:attesterId/stats', catchError(handler))
}
