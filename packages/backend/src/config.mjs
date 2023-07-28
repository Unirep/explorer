import { ethers } from 'ethers'
import { config } from 'dotenv'
config()

export const APP_ADDRESS =
  process.env.APP_ADDRESS ?? '0x87Aeb1Ff3E9b8AcF708a41A93832C704546606Cf'
export let UNIREP_ADDRESS = '0x51714b0b1bE71464e6382108DE1F5398BaDe807C'
export const ETH_PROVIDER_URL =
  process.env.ETH_PROVIDER_URL ??
  'https://arb-goerli.g.alchemy.com/v2/hfFfXlX8rR8YvrALiJ8b7ZtIPRGY1GTM'
export const ETH_LOCAL_PROVIDER_URL =
  process.env.ETH_LOCAL_PROVIDER_URL ?? 'http://127.0.0.1:8545'

export const DB_PATH = process.env.DB_PATH ?? ':memory:'

export const provider = ETH_PROVIDER_URL.startsWith('http')
  ? new ethers.providers.JsonRpcProvider(ETH_PROVIDER_URL)
  : new ethers.providers.WebSocketProvider(ETH_PROVIDER_URL)

export const localProvider = new ethers.providers.JsonRpcProvider(
  ETH_LOCAL_PROVIDER_URL
)

export const PRIVATE_KEY =
  process.env.PRIVATE_KEY ??
  '0x0f70e777f814334daa4456ac32b9a1fdca75ae07f70c2e6cef92679bad06c88b'
export const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

export const ARBITRUM_API_KEY = 'SF7Y62KJKK3XT8PN9Z6U2VVFJIFBIS7V5I'
