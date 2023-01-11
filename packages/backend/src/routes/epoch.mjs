import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    let epoch = await db.findOne('Epoch', {
      where: {
        attesterId: '1417799109672561583442883104695026698954826461290',
      },
    })
    res.json(epoch)
  }
  app.get('/api/epoch', catchError(handler))
}
