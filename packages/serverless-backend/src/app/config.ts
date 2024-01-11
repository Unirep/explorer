// import { config } from 'dotenv'
import { ethers } from 'ethers'
import {
  sepolia,
  optimismGoerli,
  optimismSepolia,
  arbitrumSepolia,
  avalancheFuji,
} from 'viem/chains'
// config()

export const runtime = 'edge'

export const NETWORK = {
  sepolia: {
    url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    chain: sepolia,
    provider: new ethers.providers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://sepolia.etherscan.io',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  'optimism-goerli': {
    url: `https://optimism-goerli.infura.io/v3/${process.env.INFURA_KEY}`,
    chain: optimismGoerli,
    provider: new ethers.providers.JsonRpcProvider(
      `https://optimism-goerli.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://goerli-optimism.etherscan.io/',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  'optimism-sepolia': {
    url: `https://optimism-sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    chain: optimismSepolia,
    provider: new ethers.providers.JsonRpcProvider(
      `https://optimism-sepolia.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://sepolia-optimism.etherscan.io/',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  'arbitrum-sepolia': {
    url: `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    chain: arbitrumSepolia,
    provider: new ethers.providers.JsonRpcProvider(
      `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://sepolia.arbiscan.io',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
  fuji: {
    url: `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_KEY}`,
    chain: avalancheFuji,
    provider: new ethers.providers.JsonRpcProvider(
      `https://avalanche-fuji.infura.io/v3/${process.env.INFURA_KEY}`
    ),
    explorer: 'https://testnet.snowtrace.io',
    unirepAddress: '0x83cB6AF63eAfEc7998cC601eC3f56d064892b386',
  },
}
