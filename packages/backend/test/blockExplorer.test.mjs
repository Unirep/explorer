import { BlockExplorer, getDeployer } from '../src/helpers/blockExplorer.mjs'
import { expect } from 'chai'
export const CONTRACT_DEPLOYERS = {
  Polygon: {
    address: '0x3f2f4aa023c6ed149d342229afac6e140e149114',
    deployer: '0x7356723b52a3a6a7c9858937b8c82d9480cfd513',
  },
  Sepolia: {
    address: '0x6375394335f34848b850114b66A49D6F47f2cdA8',
    deployer: '0x19B4F9C381C7927FE33D853e48b560141A380C44',
  },
  Mainnet: {
    address: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054',
    deployer: '0xEe729F57F0111FD0F660867d0F522f983202a5aF',
  },
  Goerli: {
    address: '0x17e1cbB275642A465Af102fDcb7dABdd5B413A6d',
    deployer: '0x6Ed13984664B3A2B7A46d3646dcB523d927839aa',
  },
  ArbitrumGoerli: {
    address: '0xac836aa647477d98b148a97d6437bddc35cc9f77',
    deployer: '0x20f3dfc8513b9482455943153e53c11062810b45',
  },
}

describe('Block Explorer Tests', function () {
  it('should be able to get deployer for each deployer smart contract', async () => {
    const deployers = await Promise.all(
      Object.entries(CONTRACT_DEPLOYERS).map(async ([network, contract]) =>
        getDeployer(BlockExplorer[network], contract.address)
      )
    )
    Object.entries(CONTRACT_DEPLOYERS)
      .map(([_, contract]) => contract.deployer.toLowerCase())
      .map((deployer, i) => expect(deployer).to.equal(deployers[i]))
  })
})
