import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const unirepAbi = require('./unirepAbi.json')

export const BlockExplorer = {
  sepolia:
    'https://eth-sepolia.g.alchemy.com/v2/NKy-j19E-A082K3ZDUwkZhI5C2sIa2qy',
  goerli:
    'https://eth-goerli.g.alchemy.com/v2/7cIl_YbD_R5-yChuWP3MkHO5zPcA8jbS',
  'optimism-goerli':
    'https://eth-goerli.g.alchemy.com/v2/7cIl_YbD_R5-yChuWP3MkHO5zPcA8jbS',
  polygon:
    'https://polygon-mumbai.g.alchemy.com/v2/6o1FUhX6yr4AtcDWw0cMsVEgE2PCl5vk',
  'arbitrum-goerli':
    'https://arb-goerli.g.alchemy.com/v2/hfFfXlX8rR8YvrALiJ8b7ZtIPRGY1GTM',
}

export const getAttesterSignUpEvents = async (
  blockExplorer,
  unirep,
  deployer
) => {
  if (unirep == '0x' || deployer == '0x') return []

  const provider = blockExplorer.startsWith('http')
    ? new ethers.providers.JsonRpcProvider(blockExplorer)
    : new ethers.providers.WebSocketProvider(blockExplorer)

  const unirepContract = new ethers.Contract(unirep, unirepAbi, provider)
  const filter = unirepContract.filters.AttesterSignedUp()
  filter.topics.push(['0x' + deployer.slice(2).toString(16).padStart(64, '0')])
  const events = unirepContract.queryFilter(filter)
  return events
}
