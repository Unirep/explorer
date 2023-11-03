import url from 'url'
import schema from '../src/schema.mjs'
import path from 'path'
import fs from 'fs'
import express from 'express'
import { SQLiteConnector } from 'anondb/node.js'
import { deployUnirep } from '@unirep/contracts/deploy/index.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const db = await SQLiteConnector.create(schema, ':memory:')

export const startServer = async () => {
  const [signer, attester] = await ethers.getSigners()
  const unirep = await deployUnirep(signer)
  await unirep
    .connect(attester)
    .attesterSignUp(300)
    .then((t) => t.wait())

  const app = express()
  const port = process.env.PORT ?? 8000
  app.listen(port, () => console.log(`Listening on port ${port}`))
  app.use('*', (req, res, next) => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-headers', '*')
    next()
  })
  app.use(express.json())

  const routeDir = path.join(__dirname, '../src/routes')
  const routes = await fs.promises.readdir(routeDir)
  for (const routeFile of routes) {
    const { default: route } = await import(path.join(routeDir, routeFile))
    route({ app, db })
  }

  return {
    app,
    db,
    attester,
    unirep,
  }
}
