import { ethers } from 'ethers'
import { config } from 'dotenv'
config()

export const UNIREP_ADDRESS =
  process.env.UNIREP_ADDRESS ?? '0x1F8d7d42b44d9570e5a23F356967A55D1FC8dA26'
export const ETH_PROVIDER_URL =
  process.env.ETH_PROVIDER_URL ?? 'https://arbitrum.goerli.unirep.io'

export const DB_PATH = process.env.DB_PATH ?? ':memory:'

export const provider = ETH_PROVIDER_URL.startsWith('http')
  ? new ethers.providers.JsonRpcProvider(ETH_PROVIDER_URL)
  : new ethers.providers.WebSocketProvider(ETH_PROVIDER_URL)
