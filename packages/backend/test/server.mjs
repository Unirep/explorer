import getPort from 'get-port'
process.env.PORT = await getPort()
process.env.HTTP_SERVER = `http://127.0.0.1:${process.env.PORT}`

export const PORT = process.env.PORT ?? 8000
export const HTTP_SERVER = `http://127.0.0.1:${PORT}`

await import('../src/index.mjs')
