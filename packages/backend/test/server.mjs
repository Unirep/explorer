import getPort from 'get-port'
process.env.PORT = await getPort()
process.env.HTTP_SERVER = `http://127.0.0.1:${process.env.PORT}`

await import('../src/index.mjs')
