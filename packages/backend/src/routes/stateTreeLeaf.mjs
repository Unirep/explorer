import catchError from '../helpers/catchError.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    let stateTreeLeaf = await db.findOne('StateTreeLeaf', {
      where: {
        attesterId: '1417799109672561583442883104695026698954826461290',
      },
    })
    res.json(stateTreeLeaf)
  }
  app.get('/api/stateTreeLeaf', catchError(handler))
}
