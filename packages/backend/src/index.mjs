import url from 'url'
import path from 'path'
import fs from 'fs'
import express from 'express'
import { provider, DB_PATH, UNIREP_ADDRESS } from './config.mjs'
import schema from './schema.mjs'
import { SQLiteConnector } from 'anondb/node.js'
import { Synchronizer } from '@unirep/core'
import { TimestampLoader } from './helpers/timestampLoader.mjs'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const db = await SQLiteConnector.create(schema, DB_PATH)

const loader = new TimestampLoader(db)
loader.start()

await db.upsert('GlobalData', {
  where: {
    _id: 'attestations',
  },
  create: {
    _id: 'attestations',
    data: JSON.stringify({
      posRep: 0,
      negRep: 0,
    }),
  },
  update: {},
})

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
synchronizer.on('AttestationSubmitted', async ({ decodedData }) => {
  const posRep = Number(decodedData.posRep)
  const negRep = Number(decodedData.negRep)
  const { data } = await synchronizer._db.findOne('GlobalData', {
    where: {
      _id: 'attestations',
    },
  })

  const stats = JSON.parse(data)
  stats.posRep += posRep
  stats.negRep += negRep
  await synchronizer._db.update('GlobalData', {
    where: {
      _id: 'attestations',
    },
    update: {
      data: JSON.stringify(stats),
    },
  })
})
console.log('Starting synchronizer...')
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

// import all non-index files from this folder
const routeDir = path.join(__dirname, 'routes')
const routes = await fs.promises.readdir(routeDir)
for (const routeFile of routes) {
  const { default: route } = await import(path.join(routeDir, routeFile))
  route({ app, db, synchronizer })
}

// app.use((error, req, res) => {
//   console.log(error, req, res)
//   res.status(500).json({
//     text: 'Uncaught error',
//     error: JSON.stringify(error, null, 2),
//   })
// })
