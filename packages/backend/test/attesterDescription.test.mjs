import { HTTP_SERVER } from './server.mjs'
import { expect } from 'chai'
import { APP_ADDRESS, wallet } from '../src/config.mjs'
import fetch from 'node-fetch'
import { BlockExplorer } from '../src/helpers/blockExplorer.mjs'
import { hashMessage } from '@ethersproject/hash'
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
      url: 'https://developer.unirep.io',
      name: 'unirep',
      network: 'ArbitrumGoerli',
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

    const url = new URL(`/api/about/${APP_ADDRESS}`, HTTP_SERVER)
    const post = await fetch(url.toString(), {
      method: 'post',
      headers: headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url.toString(), {
      method: 'get',
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

    const url = new URL(`/api/about/${APP_ADDRESS}`, HTTP_SERVER)
    const post = await fetch(url.toString(), {
      method: 'post',
      headers: headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url.toString(), {
      method: 'get',
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

    const url = new URL(`/api/about/${APP_ADDRESS}`, HTTP_SERVER)
    const post = await fetch(url.toString(), {
      method: 'post',
      headers: headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.true

    const get = await fetch(url.toString(), {
      method: 'get',
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

    const url = new URL(`/api/about/${APP_ADDRESS}`, HTTP_SERVER)
    const post = await fetch(url.toString(), {
      method: 'post',
      headers: headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url.toString(), {
      method: 'get',
      headers: { network: headers.network },
    }).then((r) => r.json())

    Object.entries(get).forEach(([_, v]) => {
      expect(v).to.equal('')
    })
  })

  it('recovered address from signature should be equal to the signer address', async () => {
    const accounts = await ethers.getSigners()
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    await Promise.all(
      accounts.map(async (contract) => {
        const signature = await contract.signMessage(hash)
        expect(ethers.utils.recoverAddress(hashMessage(hash), signature)).equal(
          contract.address
        )
      })
    )
  })
})
