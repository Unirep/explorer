import './server.mjs'
import fetch from 'node-fetch'
import { expect } from 'chai'
import { APP_ADDRESS, UNIREP_ADDRESS } from '../src/config.mjs'
import { clearCollection } from '../src/index.mjs'
import { attesterDescriptionAbi, unirepAbi } from '../src/helpers/abi.mjs'

const random = () => Math.floor(Math.random() * 100000)
const load = 1000 // time before server

describe('Attester Description Tests', function () {
  this.timeout(30000)

  let headers
  let unirepContract
  let attesterDescriptionContract
  before(async () => {
    await new Promise((r) => setTimeout(r, load))

    const accounts = await ethers.getSigners()
    unirepContract = new ethers.Contract(UNIREP_ADDRESS, unirepAbi, accounts[0])
    attesterDescriptionContract = new ethers.Contract(
      APP_ADDRESS,
      attesterDescriptionAbi,
      accounts[0]
    )
  })

  beforeEach(async () => {
    await new Promise((r) => setTimeout(r, load))
    const accounts = await ethers.getSigners()
    await Promise.all(
      accounts.map(async (attesterId) => {
        clearCollection('AttesterDescription', { attesterId })
      })
    )
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
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const randomWallet = new ethers.Wallet.createRandom()
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.signature = await randomWallet.signMessage(
      ethers.utils.arrayify(hash)
    )

    const url = new URL(`/api/about/${signer.address}`, process.env.HTTP_SERVER)
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
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.signature = await signer.signMessage(ethers.utils.arrayify(hash))
    headers.url = 'invalid url'

    const url = new URL(`/api/about/${signer.address}`, process.env.HTTP_SERVER)
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
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.signature = await signer.signMessage(ethers.utils.arrayify(hash))

    const url = new URL(`/api/about/${signer.address}`, process.env.HTTP_SERVER)
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

  it('contract should be able to post description with its own deployer signature', async () => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    await Promise.all(
      accounts.map(async (contract, i) => {
        const signature = await contract.signMessage(
          ethers.utils.arrayify(hash)
        )
        expect(
          await attesterDescriptionContract.isValidSignature(
            hash,
            signature,
            signer.address
          )
        ).equal(i == 0)
      })
    )

    await Promise.all(
      accounts.map(async (contract) => {
        headers.signature = await contract.signMessage(
          ethers.utils.arrayify(hash)
        )
        const url = new URL(
          `/api/about/${contract.address}`,
          process.env.HTTP_SERVER
        )
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
    )
  })
})
