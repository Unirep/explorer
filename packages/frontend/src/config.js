export const version = 'v2.0.0-beta-4'
export const network = 'arbitrum-goerli'
// arbitrum-goerli, goerli, mumbai, sepolia

// in CI we append a change to this value
let SERVER = process.env.SERVER ?? 'http://127.0.0.1:8000'
// let SERVER = 'https://api.explorer.unirep.io'
export { SERVER }
