import './server.mjs'
import { expect } from 'chai'
import { APP_ADDRESS } from '../src/config.mjs'
import { clearCollection } from '../src/index.mjs'
import { attesterDescriptionAbi } from '../src/helpers/abi.mjs'
import fetch from 'node-fetch'

const random = () => Math.floor(Math.random() * 100000)

describe('Attester Description Tests', function () {
  this.timeout(30000)

  let headers
  let attesterDescriptionContract
  before(async () => {
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    attesterDescriptionContract = new ethers.Contract(
      APP_ADDRESS,
      attesterDescriptionAbi,
      signer
    )
  })

  beforeEach(async () => {
    const accounts = await ethers.getSigners()
    await Promise.all(
      accounts.map(async (signer) => {
        clearCollection('AttesterDescription', {
          where: {
            attesterId: signer.address,
          },
        })
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
    const randomWallet = new ethers.Wallet.createRandom()
    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [headers.nonce, headers.description]
    )

    headers.signature = await randomWallet.signMessage(
      ethers.utils.arrayify(hash)
    )

    const url = new URL(`/api/about/${APP_ADDRESS}`, process.env.HTTP_SERVER)
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

    const url = new URL(`/api/about/${APP_ADDRESS}`, process.env.HTTP_SERVER)
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

    const url = new URL(`/api/about/${APP_ADDRESS}`, process.env.HTTP_SERVER)
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

  it('contract should have a valid signature for each signature', async () => {
    const accounts = await ethers.getSigners()
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
            accounts[i].address
          )
        ).equal(true)
      })
    )
  })
})
