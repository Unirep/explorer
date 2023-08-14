import { getUnirepContract } from '@unirep/contracts'
import { NETWORK } from '../config.mjs'

export const getDeployer = async (network, attesterId) => {
  const info = NETWORK[network]

  const unirep = getUnirepContract(info.unirepAddress, info.provider)
  const filter = unirep.filters.AttesterSignedUp(attesterId)
  const events = await unirep.queryFilter(filter)
  if (events.length) {
    const tx = await events[0].getTransaction()
    const deployer = tx.from
    return deployer
  } else {
    return '0x'
  }
}
