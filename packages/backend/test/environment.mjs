import { deployUnirep } from '@unirep/contracts/deploy/index.js'
import app from '../src/index.mjs' // start server
import pkg from 'hardhat'
const { ethers } = pkg

export const startServer = async () => {
  const [signer, attester] = await ethers.getSigners()
  const unirep = await deployUnirep(signer)
  await unirep
    .connect(attester)
    .attesterSignUp(300)
    .then((t) => t.wait())

  const attesterF = await ethers.getContractFactory('Attester')
  const attesterC = await attesterF.connect(attester).deploy(unirep.address)
  await attesterC.deployed()

  return {
    app,
    attester,
    attesterC,
  }
}
