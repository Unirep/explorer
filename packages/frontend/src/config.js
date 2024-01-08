export const version = 'v2.0.0'
export const network = 'sepolia'

// in CI we append a change to this value
let SERVER = process.env.SERVER ?? 'http://127.0.0.1:8000'
export { SERVER }
