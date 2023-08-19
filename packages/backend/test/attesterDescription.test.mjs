import pkg from 'hardhat'
const { ethers } = pkg
import { HTTP_SERVER } from './server.mjs'
import { expect } from 'chai'
import fetch from 'node-fetch'

import { startServer } from './environment.mjs'

const random = () => Math.floor(Math.random() * 100000)

let attesters
let body

const res = await startServer()
const attesterF = await ethers.getContractFactory('Attester')
const attesterC = await attesterF
  .connect(res.attester)
  .deploy(res.unirep.address)
await attesterC.deployed()

attesters = [
  {
    type: 'contract',
    deployer: res.attester,
    appAddress: attesterC.address,
  },
  { type: 'EOA', deployer: res.attester, appAddress: res.attester.address },
]

describe('Attester Description Tests', function () {
  this.timeout(0)

  beforeEach(() => {
    body = {
      description: 'example description',
      icon: '<svg>...</svg>',
      url: 'developer.unirep.io',
      name: 'unirep',
      network: 'local',
      nonce: random(),
    }
  })

  for (const { type, deployer, appAddress } of attesters) {
    it(`should not update info with incorrect signature (${type})`, async () => {
      const randomWallet = new ethers.Wallet.createRandom()
      const hash = ethers.utils.solidityKeccak256(
        ['uint256', 'string'],
        [body.nonce, body.description]
      )

      body.signature = await randomWallet.signMessage(hash)
      body.attesterId = appAddress

      const url = new URL(`/api/about/${appAddress}`, HTTP_SERVER)
      const post = await fetch(url.toString(), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((r) => r.json())

      expect(post.passed).to.be.false

      const get = await fetch(url.toString(), {
        method: 'get',
        headers: { network: body.network },
      }).then((r) => r.json())

      Object.entries(get).forEach(([_, v]) => {
        expect(v).to.equal('')
      })
    })

    it(`should not update info with invalid url (${type})`, async () => {
      const hash = ethers.utils.solidityKeccak256(
        ['uint256', 'string'],
        [body.nonce, body.description]
      )

      body.url = 'invalid url'
      body.signature = await deployer.signMessage(hash)
      body.attesterId = appAddress

      const url = new URL(`/api/about/${appAddress}`, HTTP_SERVER)
      const post = await fetch(url.toString(), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((r) => r.json())

      expect(post.passed).to.be.false

      const get = await fetch(url.toString(), {
        method: 'get',
        headers: { network: body.network },
      }).then((r) => r.json())

      Object.entries(get).forEach(([_, v]) => {
        expect(v).to.equal('')
      })
    })

    it(`should successfully update info with correct signature (${type})`, async () => {
      const hash = ethers.utils.solidityKeccak256(
        ['uint256', 'string'],
        [body.nonce, body.description]
      )

      body.signature = await deployer.signMessage(hash)
      body.attesterId = appAddress

      const url = new URL(`/api/about/${appAddress}`, HTTP_SERVER)
      const post = await fetch(url.toString(), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((r) => r.json())

      expect(post.passed).to.be.true

      const get = await fetch(url.toString(), {
        method: 'get',
        headers: { network: body.network },
      }).then((r) => r.json())

      Object.entries(get).forEach(([k, v]) => {
        expect(body[k]).to.equal(v)
      })
    })

    it(`should not update info with invalid network (${type})`, async () => {
      const hash = ethers.utils.solidityKeccak256(
        ['uint256', 'string'],
        [body.nonce, body.description]
      )
      body.network = 'mainnet'
      body.signature = await deployer.signMessage(hash)
      body.attesterId = appAddress

      const url = new URL(`/api/about/${appAddress}`, HTTP_SERVER)
      const post = await fetch(url.toString(), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((r) => r.json())

      expect(post.passed).to.be.false

      const get = await fetch(url.toString(), {
        method: 'get',
        headers: { network: body.network },
      }).then((r) => r.json())

      Object.entries(get).forEach(([_, v]) => {
        expect(v).to.equal('')
      })
    })
  }
})
