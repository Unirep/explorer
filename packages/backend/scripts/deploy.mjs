import fs from 'fs'
import path from 'path'
import url from 'url'
import { createRequire } from 'module'
import { deployUnirep } from '@unirep/contracts/deploy/index.js'
import hardhat from 'hardhat'
import { ETH_PROVIDER_URL, UNIREP_ADDRESS, provider } from '../src/config.mjs'
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
const unirep = await deployUnirep(signer, {
  STATE_TREE_DEPTH: 20,
})

const App = await ethers.getContractFactory('AttesterDescription')
const app = await retryAsNeeded(() => App.deploy(unirep.address))
// UNIREP_ADDRESS = unirep.address

await app.deployed()

console.log(
  `Unirep app with epoch length ${2 ** 32} deployed to ${app.address}`
)

const config = `module.exports = {
  UNIREP_ADDRESS: '${unirep.address}',
  APP_ADDRESS: '${app.address}',
  ETH_PROVIDER_URL: '${ETH_PROVIDER_URL}',
  ${
    Array.isArray(hardhat.network.config.accounts)
      ? `PRIVATE_KEY: '${hardhat.network.config.accounts[0]}',`
      : `/**
    This contract was deployed using a mnemonic. The PRIVATE_KEY variable needs to be set manually
  **/`
  }
}
`

const configPath = path.join(__dirname, '../../../config.js')
await fs.promises.writeFile(configPath, config)

console.log(`Config written to ${configPath}`)
