import { ethers } from 'ethers'
import { config } from 'dotenv'
config()

export const UNIREP_ADDRESS =
  process.env.UNIREP_ADDRESS ?? '0xCa61bFcA0107c5952f8bf59f4D510d111cbcE146'
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
