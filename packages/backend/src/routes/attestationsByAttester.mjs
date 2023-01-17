import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const attester = req.params.attesterId
    console.log(attester)
    const attestations = await db.findMany('Attestation', {
      where: {
        attesterId: attester,
      },
    })
    res.json(attestations)
  }
  app.get('/api/attester/:attesterId/attestations', catchError(handler))
}
