import { ethers } from 'ethers'
import { config } from 'dotenv'
config()

export const UNIREP_ADDRESS =
  process.env.UNIREP_ADDRESS ?? '0x6354F74F29982190B0a830Ac46E279B03d5e169c'
export const ETH_PROVIDER_URL =
  process.env.ETH_PROVIDER_URL ?? 'https://arbitrum.goerli.unirep.io'

export const DB_PATH = process.env.DB_PATH ?? ':memory:'

export const provider = ETH_PROVIDER_URL.startsWith('http')
  ? new ethers.providers.JsonRpcProvider(ETH_PROVIDER_URL)
  : new ethers.providers.WebSocketProvider(ETH_PROVIDER_URL)
