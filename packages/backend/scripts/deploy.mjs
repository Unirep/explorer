import fs from 'fs'
import path from 'path'
import url from 'url'
import { createRequire } from 'module'
import hardhat from 'hardhat'
import { ETH_PROVIDER_URL, UNIREP_ADDRESS } from '../src/config.mjs'
const { ethers } = hardhat

const require = createRequire(import.meta.url)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const retryAsNeeded = async (fn) => {
  let backoff = 1000
  for (;;) {
    try {
      return await fn()
    } catch (err) {
      backoff *= 2
      console.log(`Failed, waiting ${backoff}ms`)
      await new Promise((r) => setTimeout(r, backoff))
    }
  }
}

const AttesterDescription = require('../src/abi/AttesterDescription.json')

const [signer] = await ethers.getSigners()
const App = await ethers.getContractFactory('AttesterDescription')
const app = await retryAsNeeded(() => App.deploy())

await app.deployed()

const config = `
APP_ADDRESS='${app.address}'
ETH_PROVIDER_URL='${ETH_PROVIDER_URL}'
${
  Array.isArray(hardhat.network.config.accounts)
    ? `PRIVATE_KEY: '${hardhat.network.config.accounts[0]}',`
    : `# This contract was deployed using a mnemonic. The PRIVATE_KEY variable needs to be set manually`
}
`

const configPath = path.join(__dirname, '../.env')
await fs.promises.writeFile(configPath, config)

console.log(`Config written to ${configPath}`)
