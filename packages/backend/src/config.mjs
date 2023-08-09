import { ethers } from 'ethers'
import { config } from 'dotenv'
config()

export let UNIREP_ADDRESS =
  process.env.UNIREP_ADDRESS ?? '0x4D137bb44553d55AE6B28B5391c6f537b06C9cc3'
export const ETH_PROVIDER_URL =
  process.env.ETH_PROVIDER_URL ??
  'https://arb-goerli.g.alchemy.com/v2/hfFfXlX8rR8YvrALiJ8b7ZtIPRGY1GTM'
// export const ETH_PROVIDER_URL =
//   process.env.ETH_PROVIDER_URL ?? 'http://127.0.0.1:8545'

export const DB_PATH = process.env.DB_PATH ?? ':memory:'

export const provider = ETH_PROVIDER_URL.startsWith('http')
  ? new ethers.providers.JsonRpcProvider(ETH_PROVIDER_URL)
  : new ethers.providers.WebSocketProvider(ETH_PROVIDER_URL)

export const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
