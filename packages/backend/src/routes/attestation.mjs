import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    let attestation = await db.findOne('Attestation', {
      where: {
        attesterId: '1417799109672561583442883104695026698954826461290',
      },
    })
    res.json(attestation)
  }
  app.get('/api/attestation', catchError(handler))
}
