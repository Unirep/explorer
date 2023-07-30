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
