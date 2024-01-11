import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { ethers } from 'ethers'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { hashMessage } from '@ethersproject/hash'

export const runtime = 'edge'

import { NETWORK } from '@/app/config'

async function getDeployer(network: string, attesterId: string) {
  const { url, chain, unirepAddress } = NETWORK[network as keyof typeof NETWORK]

  const transport = http(url)
  const publicClient = createPublicClient({
    chain: chain,
    transport: transport,
  })

  const logs = await publicClient.getLogs({
    address: unirepAddress as any,
    event: parseAbiItem(
      'event AttesterSignedUp(uint160 indexed, uint48, uint48)'
    ),
    args: [BigInt(attesterId)],
    fromBlock: BigInt(0),
  })
  if (logs.length === 0) {
    return '0x'
  }
  const transaction = await publicClient.getTransaction({
    hash: logs[0].transactionHash,
  })

  return transaction.from
}

export async function POST(
  request: NextRequest,
  context: { params: { attesterId: string } }
) {
  const attesterId = context.params.attesterId
  const res = await request.json()
  const { icon, url, name, description, nonce, signature, network } = res
  const id = `${attesterId}${network}`

  let passed = true

  if (url) {
    const validUrl = await fetch(`https://${url}`).catch(() => false)
    if (!validUrl) {
      return Response.json({ passed: false, error: 'Invalid Url' })
    }
  }

  const hash = hashMessage(
    ethers.utils.solidityKeccak256(['uint256', 'string'], [nonce, description])
  )

  if (!(network in NETWORK)) {
    return Response.json({ passed: false, error: 'Network not found' })
  }

  const deployer = await getDeployer(network, attesterId)
  if (
    deployer == '0x' ||
    !(
      ethers.utils.recoverAddress(hash, signature).toLowerCase() ==
      deployer.toLowerCase()
    )
  ) {
    return Response.json({
      passed: false,
      error: 'Deployer and signature do not match',
    })
  }
  console.log('insert')
  try {
    // This is an intentional mispelling

    await process.env.DB.prepare(
      `INSERT or REPLACE INTO AttesterDescription (id, name, attesterId, network, url, icon, description) VALUES ("${id}", "${name}", "${attesterId}", "${network}", "${url}", '${icon}', "${description}")`
    ).run()
    return Response.json({ passed })
  } catch (e: any) {
    console.error(e.message)
    if (e.message === 'D1_ERROR: no such table: AttesterDescription') {
      await process.env.DB.prepare(
        `
                CREATE TABLE
                    IF NOT EXISTS AttesterDescription (
                        id TEXT PRIMARY KEY,
                        name TEXT,
                        attesterId TEXT,
                        network TEXT,
                        url TEXT,
                        icon TEXT,
                        description TEXT
                    );
                `
      ).all()
      await process.env.DB.prepare(
        `INSERT or REPLACE INTO AttesterDescription (id, name, attesterId, network, url, icon, description) VALUES ("${id}", "${name}", "${attesterId}", "${network}", "${url}", '${icon}', "${description}")`
      ).run()
      return Response.json({ passed })
    }
    return Response.json({ error: e.message })
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { attesterId: string } }
) {
  const attesterId = context.params.attesterId
  const res = await request.text()
  const headersList = headers()
  const network = headersList.get('network')
  const id = `${attesterId}${network}`

  try {
    const { results } = await process.env.DB.prepare(
      'SELECT * FROM AttesterDescription WHERE id = ?'
    )
      .bind(id)
      .all()
    if (results.length === 0) {
      return Response.json({
        icon: '',
        name: '',
        description: '',
        url: '',
        network: '',
      })
    }
    return Response.json(results[0])
  } catch (e: any) {
    console.error({
      message: e.message,
    })
    if (e.message === 'D1_ERROR: no such table: AttesterDescription') {
      await process.env.DB.prepare(
        `
                CREATE TABLE
                    IF NOT EXISTS AttesterDescription (
                        id TEXT PRIMARY KEY,
                        name TEXT,
                        attesterId TEXT,
                        network TEXT,
                        url TEXT,
                        icon TEXT,
                        description TEXT
                    );
                `
      ).all()
      return Response.json({
        icon: '',
        name: '',
        description: '',
        url: '',
        network: '',
      })
    }
    return Response.json({ error: e.message })
  }
}
