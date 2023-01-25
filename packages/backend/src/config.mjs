import { ethers } from 'ethers'
import { config } from 'dotenv'
config()

export const UNIREP_ADDRESS =
  process.env.UNIREP_ADDRESS ?? '0x1F8d7d42b44d9570e5a23F356967A55D1FC8dA26'
// process.env.UNIREP_ADDRESS ?? '0x5e50ba700443ffa87d3a02039234daa4f3c59a36'
export const ETH_PROVIDER_URL =
  process.env.ETH_PROVIDER_URL ?? 'https://arbitrum.goerli.unirep.io'
// process.env.ETH_PROVIDER_URL ?? 'Arbitrum/Goerli'

export const DB_PATH = process.env.DB_PATH ?? ':memory:'

export const VERSION = 'v2'
export const RELEASE = 'Jan 2023'
export const EMPTY_EPOCH_TREE_ROOT =
  '0xa7c5ac471b4784230fcf80dc33721d53cddd6e04c059210385c67dfe32a0'
export const AGGREGATE_KEY_COUNT =
  '0xa7c5ac471b4784230fcf80dc33721d53cddd6e04c059210385c67dfe32a0'
export const STATE_TREE_DEPTH = '20'
export const EPOCH_TREE_DEPTH = '96'
export const EPOCH_TREE_ARITY = '16'
export const EPOCH_KEY_NONCE_COUNT = '3'

export const provider = ETH_PROVIDER_URL.startsWith('http')
  ? new ethers.providers.JsonRpcProvider(ETH_PROVIDER_URL)
  : new ethers.providers.WebSocketProvider(ETH_PROVIDER_URL)
