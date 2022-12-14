import url from 'url'
import path from 'path'
import fs from 'fs'
import express from 'express'
import { provider, DB_PATH, UNIREP_ADDRESS } from './config.mjs'
import { schema } from '@unirep/core'
import { SQLiteConnector } from 'anondb/node.js'
import { Synchronizer } from './singletons/Synchronizer.mjs'

const _schema = schema.map(row => {
  if (row.name !== 'Epoch') return row
  return {
    name: 'Epoch',
    indexes: [{ keys: ['number', 'attesterId'] }],
    rows: [
      ['number', 'Int'],
      ['attesterId', 'String'],
      ['sealed', 'Bool'],
    ],
  }
})

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const db = await SQLiteConnector.create(_schema, DB_PATH ?? ':memory:')
const synchronizer = new Synchronizer({
  db,
  provider,
  unirepAddress: UNIREP_ADDRESS,
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
