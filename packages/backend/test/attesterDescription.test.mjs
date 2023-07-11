import { wallet } from '../src/config.mjs'
import './server.mjs'
import fetch from 'node-fetch'
import { ethers } from 'ethers'
import { expect } from 'chai'
import randomf from 'randomf'

/*
- attesters can successfully update info if they have correct signature
(we can test even if attester changes ownership and sign the info, and even multisig?)

attesters cannot update info if with invalid signature
check if info successfully saved in db
*/

const random = () => Math.floor(Math.random() * 100000)
const randomSignature = () =>
  '0x00' + randomf(2n << (BigInt(512) - 1n)).toString(16)

describe('Attester Description Tests', function () {
  let attesters
  let headers
  before(async () => {
    await new Promise((r) => setTimeout(r, 600))

    const url = new URL('/api/unirep/attesters', process.env.HTTP_SERVER)
    const r = await fetch(url.toString()).then((r) => r.json())
    attesters = r.items.map((x) => '0x' + parseInt(x._id).toString(16))
  })

  this.beforeEach(async () => {
    await new Promise((r) => setTimeout(r, 600))
    headers = {
      description: 'example description',
      icon: '<svg>...</svg>',
      url: 'https://developer.unirep.io',
      name: 'unirep',
      nonce: random(),
    }
  })

  it('should not update info with incorrect signature', async () => {
    headers.signature = randomSignature()
    console.log(attesters)
    const url = new URL(`/api/about/${attesters[-1]}`, process.env.HTTP_SERVER)
    const post = await fetch(url.toString(), {
      method: 'post',
      headers: headers,
    }).then((r) => r.json())

    expect(post.passed).to.be.false

    const get = await fetch(url.toString(), {
      method: 'get',
    }).then((r) => r.json())

    console.log(get)

    Object.entries(get).forEach(([k, v]) => {
      expect(v).to.equal('')
    })
  })

  // it('should successfully update info with correct signature', async () => {
  //   const hash = ethers.utils.solidityKeccak256(
  //     ['uint256', 'string'],
  //     [headers.nonce, headers.description]
  //   )

  //   headers.signature = await wallet.signMessage(ethers.utils.arrayify(hash))

  //   const url = new URL(`/api/about/${attesters[-1]}`, process.env.HTTP_SERVER)
  //   const post = await fetch(url.toString(), {
  //     method: 'post',
  //     headers: headers,
  //   }).then((r) => r.json())

  //   expect(post.passed).to.be.true

  //   const get = await fetch(url.toString(), {
  //     method: 'get',
  //   }).then((r) => r.json())

  //   Object.entries(get).forEach(([k, v]) => {
  //     expect(headers[k]).to.equal(v)
  //   })
  // })
})
