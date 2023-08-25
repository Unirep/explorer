import url from 'url'
import path from 'path'
import fs from 'fs'
import express from 'express'
import { DB_PATH } from './config.mjs'
import schema from './schema.mjs'
import { SQLiteConnector } from 'anondb/node.js'
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
      totalBytes: 0,
    }),
  },
  update: {},
})

// TODO: run synchronizer

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
  route({ app, db })
}

export default app
