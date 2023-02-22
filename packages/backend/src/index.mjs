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
synchronizer.on('Attestation', async ({ decodedData }) => {
  const change = Number(decodedData.change)
  const fieldIndex = Number(decodedData.fieldIndex)
  const attesterId = BigInt(decodedData.attesterId).toString(10)
  const { data } = await synchronizer._db.findOne('GlobalData', {
    where: {
      _id: 'attestations',
    },
  })

  const byteCount = Math.ceil(BigInt(change).toString(16).length / 2)
  const stats = JSON.parse(data)
  stats.totalBytes += byteCount
  await synchronizer._db.update('GlobalData', {
    where: {
      _id: 'attestations',
    },
    update: {
      data: JSON.stringify(stats),
    },
  })

  const attesterData = await synchronizer._db.findOne('AttesterData', {
    where: {
      _id: attesterId,
    },
  })
  if (attesterData) {
    const { data } = attesterData
    const attesterStats = JSON.parse(data)
    attesterStats.totalBytes += byteCount
    await synchronizer._db.update('AttesterData', {
      where: {
        _id: attesterId,
      },
      update: {
        data: JSON.stringify(attesterStats),
      },
    })
  } else {
    await synchronizer._db.create('AttesterData', {
      _id: attesterId,
      data: JSON.stringify({
        totalBytes: byteCount,
      }),
    })
  }
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
