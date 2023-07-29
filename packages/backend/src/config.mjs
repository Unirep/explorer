import { ethers } from 'ethers'
import { config } from 'dotenv'
config()

export const APP_ADDRESS =
  process.env.APP_ADDRESS ?? '0x7BDFD4c1F65b4A09263c38fe99B6c4BC94d38568'
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
  '0xbca43b51928100e446f2265f1493c3e9187d62eb26ef043f8ecbae6cb27e4f51'
export const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
