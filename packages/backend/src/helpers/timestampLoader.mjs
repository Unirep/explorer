import fetch from 'node-fetch'
import { NETWORK } from '../config.mjs'

export class TimestampLoader {
  constructor(db) {
    this.db = db
  }

  start() {
    this._start()
  }

  async _start() {
    for (;;) {
      await new Promise((r) => setTimeout(r, 1000))
      try {
        await this.loadTimestampBatch()
        // TODO: support websocket
        // await this.loadTimestamps()
      } catch (err) {
        console.log(err)
        console.log('Timestamp loading error')
      }
    }
  }

  async loadTimestampBatch() {
    for (const network of Object.keys(NETWORK)) {
      const blocks = await this.db.findMany('BlockTimestamp', {
        where: {
          network: NETWORK[network].name,
          timestamp: 0,
        },
      })
      if (blocks.length === 0) return
      const startId = Math.floor(Math.random() * 10000000000)
      const requests = blocks.map((b, i) => ({
        method: 'eth_getBlockByNumber',
        params: [`0x${b.number.toString(16)}`, false],
        id: startId + i,
        jsonrpc: '2.0',
      }))
      const data = await fetch(ETH_PROVIDER_URL, {
        method: 'POST',
        body: JSON.stringify(requests),
        headers: { 'content-type': 'application/json' },
      }).then((r) => r.json())
      await this.db.transaction((_db) => {
        for (const { result } of data) {
          const timestamp = Number(result.timestamp)
          const number = Number(result.number)
          _db.update('BlockTimestamp', {
            where: {
              number,
            },
            update: {
              timestamp,
            },
          })
        }
      })
    }
  }

  async loadTimestamps() {
    const blocks = await this.db.findMany('BlockTimestamp', {
      where: {
        timestamp: 0,
      },
    })
    for (const { number } of blocks) {
      const { timestamp } = await provider.getBlock(number)
      await this.db.update('BlockTimestamp', {
        where: {
          number,
        },
        update: {
          timestamp: Number(timestamp),
        },
      })
    }
  }

  static async inject(network, objs, db) {
    const timestamps = await db.findMany('BlockTimestamp', {
      where: {
        network: network,
        number: objs.map(({ blockNumber }) => blockNumber),
      },
    })
    const timestampsByBlock = timestamps.reduce((acc, o) => {
      return {
        [o.number]: o.timestamp,
        ...acc,
      }
    }, {})
    return objs.map((o) => ({
      ...o,
      timestamp: timestampsByBlock[o.blockNumber.toString()],
    }))
  }
}
