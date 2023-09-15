import { NETWORK } from '../config.mjs'
import catchError from '../helpers/catchError.mjs'

export default ({ app, db }) => {
  const handler = async (req, res) => {
    const NETWORKS = {}

    const networkData = await db.findMany('NetworkData', {
      where: {},
    })
    for (const data of networkData) {
      const network = data.network
      const { explorer, unirepAddress } = NETWORK[network]
      NETWORKS[network] = {
        explorer,
        unirepAddress,
        ...data,
      }
    }

    res.json({
      NETWORKS,
    })
  }
  app.get('/api/info', catchError(handler))
}
