import { deployUnirep } from '@unirep/contracts/deploy/index.js'
import { ZkIdentity, stringifyBigInts } from '@unirep/utils'
import { SignupProof, Circuit } from '@unirep/circuits'
import { defaultProver } from '@unirep/circuits/provers/defaultProver.js'
import { ethers } from 'ethers'

const GANACHE_URL = 'http://127.0.0.1:18545'
const FUNDED_PRIVATE_KEY =
  '0x0000000000000000000000000000000000000000000000000000000000000001'

async function waitForGanache() {
  for (let x = 0; x < 100; x++) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const provider = new ethers.providers.JsonRpcProvider(GANACHE_URL)
      await provider.getNetwork()
      break
    } catch (_) {}
  }
}

await waitForGanache()
const provider = new ethers.providers.JsonRpcProvider(GANACHE_URL)
await provider.getNetwork()
const fundedWallet = new ethers.Wallet(FUNDED_PRIVATE_KEY, provider)

const unirep = await deployUnirep(fundedWallet)
console.log('Unirep: ', unirep.address)

// bootstrap attesters
const attesterNum = 3
const userNum = 3
for (let i = 0; i < attesterNum; i++) {
  const wallet = ethers.Wallet.createRandom().connect(provider)
  const tx = {
    to: wallet.address,
    value: ethers.utils.parseEther('10'),
  }
  await fundedWallet.sendTransaction(tx).then((t) => t.wait())

  const epochLength = 100 * (i + 1)
  await unirep
    .connect(wallet)
    .attesterSignUp(epochLength)
    .then((t) => t.wait())
  console.log(
    `attester Id ${i + 1}: `,
    wallet.address,
    `epoch length: ${epochLength}`
  )
  // bootstrap users
  for (let j = 0; j < userNum; j++) {
    const id = new ZkIdentity()
    const epoch = await unirep.attesterCurrentEpoch(wallet.address)
    const r = await defaultProver.genProofAndPublicSignals(
      Circuit.signup,
      stringifyBigInts({
        epoch: epoch.toString(),
        identity_nullifier: id.identityNullifier,
        identity_trapdoor: id.trapdoor,
        attester_id: wallet.address,
      })
    )
    const { publicSignals, proof } = new SignupProof(
      r.publicSignals,
      r.proof,
      defaultProver
    )
    await unirep
      .connect(wallet)
      .userSignUp(publicSignals, proof)
      .then((t) => t.wait())
  }
}

process.exit(0)