import { HTTP_SERVER } from './server.mjs'
import { expect } from 'chai'
import { APP_ADDRESS, wallet } from '../src/config.mjs'
import fetch from 'node-fetch'
import { BlockExplorer } from '../src/helpers/blockExplorer.mjs'
import { startServer } from './environment.mjs'

const clearCollection = async (db, collection, options) => {
  if (await db.findOne(collection, options)) {
    await db.delete(collection, options)
  }
}

const random = () => Math.floor(Math.random() * 100000)

describe('Attester Description Tests', function () {
  this.timeout(30000)

  let headers
  let _db
  const url = `${HTTP_SERVER}/api/about/${APP_ADDRESS}`

  before(async () => {
    let { db } = await startServer()
    _db = db
  })

  beforeEach(async () => {
    clearCollection(_db, 'AttesterDescription', {
      where: {
        attesterId: APP_ADDRESS,
      },
    })
    headers = {
      description: 'example description',
      icon: '<svg>...</svg>',
      url: 'developer.unirep.io',
      name: 'unirep',
      network: 'arbitrum-goerli',
      nonce: random(),
    }
  })

  it('should not update info with incorrect signature', async () => {
    const randomWallet = new ethers.Wallet.createRandom()
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.signature = await randomWallet.signMessage(hash)

    const post = await fetch(url, {
      method: 'POST',
      headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url, {
      method: 'GET',
      headers: { network: headers.network },
    }).then((r) => r.json())

    Object.entries(get).forEach(([_, v]) => {
      expect(v).to.equal('')
    })
  })

  it('should not update info with invalid url', async () => {
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.url = 'invalid url'
    headers.signature = await wallet.signMessage(hash)

    const post = await fetch(url, {
      method: 'POST',
      headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url, {
      method: 'GET',
      headers: { network: headers.network },
    }).then((r) => r.json())

    Object.entries(get).forEach(([_, v]) => {
      expect(v).to.equal('')
    })
  })

  it('should successfully update info with correct signature', async () => {
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.signature = await wallet.signMessage(hash)

    const post = await fetch(url, {
      method: 'POST',
      headers: headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.true

    const get = await fetch(url, {
      method: 'GET',
      headers: { network: headers.network },
    }).then((r) => r.json())

    Object.entries(get).forEach(([k, v]) => {
      expect(headers[k]).to.equal(v)
    })
  })

  it('should not update info with invalid network', async () => {
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )
    headers.network = BlockExplorer.Mainnet
    headers.signature = await wallet.signMessage(hash)

    const post = await fetch(url, {
      method: 'POST',
      headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url, {
      method: 'GET',
      headers: { network: headers.network },
    }).then((r) => r.json())

    Object.entries(get).forEach(([_, v]) => {
      expect(v).to.equal('')
    })
  })
})
