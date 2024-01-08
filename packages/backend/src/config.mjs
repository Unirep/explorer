import { config } from 'dotenv'
import { ethers } from 'ethers'
import pkg from 'hardhat'
const { ethers: hardhatEthers } = pkg
config()

export const DB_PATH = process.env.DB_PATH ?? ':memory:'

export const NETWORK = {
  sepolia: {
    provider: new ethers.providers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://sepolia.etherscan.io',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  'arbitrum-sepolia': {
    provider: new ethers.providers.JsonRpcProvider(
      `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://sepolia.arbiscan.io/',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  // goerli: {
  //   provider: new ethers.providers.JsonRpcProvider(
  //     `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`
  //   ),
  //   explorer: 'https://goerli.etherscan.io',
  //   unirepAddress: '0x4D137bb44553d55AE6B28B5391c6f537b06C9cc3',
  // },
  // mumbai: {
  //   provider: new ethers.providers.JsonRpcProvider(
  //     `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}`
  //   ),
  //   explorer: 'https://mumbai.polygonscan.com',
  //   unirepAddress: '0x4D137bb44553d55AE6B28B5391c6f537b06C9cc3',
  // },

  'optimism-sepolia': {
    provider: new ethers.providers.JsonRpcProvider(
      `https://optimism-sepolia.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://sepolia-optimism.etherscan.io/',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  fuji: {
    provider: new ethers.providers.JsonRpcProvider(
      `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://testnet.snowtrace.io',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  // for test
  local: {
    provider: (await hardhatEthers.getSigners())[0].provider,
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
}
