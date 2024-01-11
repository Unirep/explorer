import { NETWORK } from '@/app/config'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { results } = await process.env.DB.prepare(
      'SELECT * FROM NetworkData'
    ).all()
    const NETWORKS: { [key: string]: any } = {}
    for (const row of results) {
      NETWORKS[row.network] = row
    }
    return Response.json({ NETWORKS: NETWORKS })
  } catch (e: any) {
    if (e.message === 'D1_ERROR: no such table: NetworkData') {
      await process.env.DB.prepare(
        `
                CREATE TABLE
                    IF NOT EXISTS NetworkData (
                        network TEXT PRIMARY KEY,
                        unirepAddress TEXT,
                        explorer TEXT,
                        stateTreeDepth INTEGER,
                        epochTreeDepth INTEGER,
                        historyTreeDepth INTEGER,
                        numEpochKeyNoncePerEpoch INTEGER,
                        fieldCount INTEGER,
                        sumFieldCount INTEGER,
                        replNonceBits INTEGER,
                        replFieldBits INTEGER
                    );
                
                `
      ).all()

      for (let network in NETWORK) {
        await process.env.DB.prepare(
          `INSERT INTO
                  NetworkData (
                      network,
                      unirepAddress,
                      explorer,
                      stateTreeDepth,
                      epochTreeDepth,
                      historyTreeDepth,
                      numEpochKeyNoncePerEpoch,
                      fieldCount,
                      sumFieldCount,
                      replNonceBits,
                      replFieldBits
                  )
              VALUES
                ('${network}', '${
            NETWORK[network as keyof typeof NETWORK].unirepAddress
          }', '${
            NETWORK[network as keyof typeof NETWORK].explorer
          }', 17, 17, 17, 3, 6, 4, 48, 205)`
        ).all()
      }

      const { results } = await process.env.DB.prepare(
        'SELECT * FROM NetworkData'
      ).all()
      const NETWORKS: { [key: string]: any } = {}
      for (const row of results) {
        NETWORKS[row.network] = row
      }
      return Response.json({ NETWORKS: NETWORKS })
    }
    return Response.json({ error: e.message })
  }
}
