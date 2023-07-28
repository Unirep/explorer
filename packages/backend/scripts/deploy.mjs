import { wallet, UNIREP_ADDRESS, ETH_PROVIDER_URL } from '../src/config.mjs'
import { deployAttesterDescription } from './deployAttesterDescription.mjs'
import hardhat from 'hardhat'
import path from 'path'
import url from 'url'
import fs from 'fs'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const app = await deployAttesterDescription(wallet, UNIREP_ADDRESS)

const config = `
APP_ADDRESS='${app.address}'
ETH_PROVIDER_URL='${ETH_PROVIDER_URL}'
${
  Array.isArray(hardhat.network.config.accounts)
    ? `PRIVATE_KEY='${hardhat.network.config.accounts[0]}'`
    : `# This contract was deployed using a mnemonic. The PRIVATE_KEY variable needs to be set manually`
}
`

const configPath = path.join(__dirname, '../.env')
await fs.promises.writeFile(configPath, config)

console.log(`Config written to ${configPath}`)
