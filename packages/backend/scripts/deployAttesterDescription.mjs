import path from 'path'
import url from 'url'
import { createRequire } from 'module'
import hardhat from 'hardhat'
const { ethers } = hardhat

const require = createRequire(import.meta.url)

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

export const deployAttesterDescription = async (signer) => {
  const AttesterDescription = require('../artifacts/contracts/AttesterDescription.sol/AttesterDescription.json')

  const App = await ethers.getContractFactory(
    AttesterDescription.abi,
    AttesterDescription.bytecode,
    signer
  )
  const app = await retryAsNeeded(() => App.deploy())
  await app.deployed()

  return app
}
