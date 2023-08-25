import { deployUnirep } from '@unirep/contracts/deploy/index.js'
import pkg from 'hardhat'
const { ethers } = pkg

import { spawn } from 'child_process'
const providerURL = `http://127.0.0.1:8545`

const hardhat = spawn('npx hardhat node', { shell: true })
hardhat.stderr.on('data', (data) => {
  console.error(`hardhat stderr: ${data}`)
})
hardhat.on('close', (code) => {
  console.error(`hardhat exit with code: ${code}`)
  hardhat.kill(9)
  process.exit(code)
})

export const startServer = async () => {
  for (;;) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerURL)
      await provider.getNetwork()
      break
    } catch (_) {}
  }
  const provider = new ethers.providers.JsonRpcProvider(providerURL)
  const signer = new ethers.Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    provider
  )
  const attester = new ethers.Wallet.createRandom().connect(provider)
  await signer.sendTransaction({
    to: attester.address,
    value: ethers.utils.parseEther('1'), // 1 ether
  })
  const unirep = await deployUnirep(signer)
  await unirep
    .connect(attester)
    .attesterSignUp(300)
    .then((t) => t.wait())

  const attesterF = await ethers.getContractFactory('Attester')
  const attesterC = await attesterF.connect(attester).deploy(unirep.address)
  await attesterC.deployed()

  return {
    attester,
    attesterC,
  }
}
