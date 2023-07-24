import { wallet } from '../src/config.mjs'
import './server.mjs'
import fetch from 'node-fetch'
import { ethers } from 'ethers'
import { expect } from 'chai'
import randomf from 'randomf'
import { clearCollection } from '../src/index.mjs'

const random = () => Math.floor(Math.random() * 100000)
const randomSignature = () =>
  '0x00' + randomf(2n << (BigInt(512) - 1n)).toString(16)
const load = 1000 // time before server

describe('Attester Description Tests', function () {
  let attesters
  let headers
  this.timeout(30000)
  before(async () => {
    await new Promise((r) => setTimeout(r, load))

    const url = new URL('/api/unirep/attesters', process.env.HTTP_SERVER)
    const r = await fetch(url.toString()).then((r) => r.json())
    attesters = r.items.map((x) => '0x' + parseInt(x._id).toString(16))
  })

  beforeEach(async () => {
    await new Promise((r) => setTimeout(r, load))
    await clearCollection('AttesterDescription', {
      where: { _id: attesters[-1] },
    })
    headers = {
      description: 'example description',
      icon: '<svg>...</svg>',
      url: 'https://developer.unirep.io',
      name: 'unirep',
      network: 'unirep-goerli',
      nonce: random(),
    }
  })

  it('should not update info with incorrect signature', async () => {
    headers.signature = randomSignature()
    const url = new URL(`/api/about/${attesters[-1]}`, process.env.HTTP_SERVER)
    const post = await fetch(url.toString(), {
      method: 'post',
      headers: headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url.toString(), {
      method: 'get',
      headers: { network: headers.network },
    }).then((r) => r.json())

    Object.entries(get).forEach(([k, v]) => {
      expect(v).to.equal('')
    })
  })

  it('should not update info with invalid url', async () => {
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.signature = await wallet.signMessage(ethers.utils.arrayify(hash))
    headers.url = 'invalid url'

    const url = new URL(`/api/about/${attesters[-1]}`, process.env.HTTP_SERVER)
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

    headers.signature = await wallet.signMessage(ethers.utils.arrayify(hash))

    const url = new URL(`/api/about/${attesters[-1]}`, process.env.HTTP_SERVER)
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
})
