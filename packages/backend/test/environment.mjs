import url from 'url'
import schema from '../src/schema.mjs'
import { TimestampLoader } from '../src/helpers/timestampLoader.mjs'
import path from 'path'
import fs from 'fs'
import express from 'express'
import { provider, UNIREP_ADDRESS } from '../src/config.mjs'
import { SQLiteConnector } from 'anondb/node.js'
import { Synchronizer } from '@unirep/core'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const db = await SQLiteConnector.create(schema, 'testdb.sqlite')

export const startServer = async () => {
  const loader = new TimestampLoader(db)
  loader.start()

  const synchronizer = new Synchronizer({
    db,
    provider,
    unirepAddress: UNIREP_ADDRESS,
  })
  synchronizer.on('processedEvent', async (event) => {
    await db.upsert('BlockTimestamp', {
      where: {
        number: event.blockNumber,
      },
      create: {
        number: event.blockNumber,
      },
      update: {},
    })
  })
  await synchronizer.start()

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
    route({ app, db, synchronizer })
  }

  return {
    app,
    db,
    synchronizer,
  }
}
