import { ethers } from 'ethers'
import catchError from '../helpers/catchError.mjs'
import {
  localProvider,
  provider,
  UNIREP_ADDRESS,
  APP_ADDRESS,
  wallet,
} from '../config.mjs'
import { attesterDescriptionAbi } from '../helpers/abi.mjs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const UnirepAppAbi = require('../abi/AttesterDescription.json')

export default ({ app, db, synchronizer }) => {
  const handleSet = async (req, res) => {
    // EIP Interface code
    // isValidSignatureSelector 0xe0c5e6c3
    // getDescriptionSelector 0x1a092541
    // setDescriptionSelector 0xf0d3533b
    // interfaceId 0x93c93c46
    // wallet signature: 0xb12f4be8935bc6f58e9b013472451f31791cce7c59f6c78b869aa67e6168dc3b4de9b5d7e3675de2b87ca0ae7e56871f9daeb0ac512cb55af58dce0729754fc51b

    const attesterId = req.params.attesterId
    const { icon, url, name, description, nonce, signature } = req.headers

    let attesterDescription = JSON.stringify({ icon, name, description, url })
    let passed = true

    const contract = new ethers.Contract(
      APP_ADDRESS,
      attesterDescriptionAbi,
      wallet
    )

    let supportsInterface = false
    try {
      supportsInterface = await contract.supportsInterface('0x93c93c46')
    } catch (_) {
      // assume the function call fails and the interface is not supported
      res.status(401)
      passed = false
    }

    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [nonce, description]
    )

    if (!(await contract.isValidSignature(hash, signature))) {
      res.status(401)
      passed = false
    }

    const _attesterDescription = await db.findOne('AttesterDescription', {
      where: {
        _id: attesterId,
      },
    })

    if (_attesterDescription) {
      await db.update('AttesterDescription', {
        where: {
          _id: attesterId,
        },
        update: {
          data: attesterDescription,
        },
      })
    } else {
      await db.create('AttesterDescription', {
        _id: attesterId,
        data: attesterDescription,
      })
    }

    res.status(200)
    res.json({ passed })
  }

  const handleGet = async (req, res) => {
    const attesterId = req.params.attesterId

    const attesterDescription = await db.findOne('AttesterDescription', {
      where: {
        _id: attesterId,
      },
    })

    if (attesterDescription) {
      const { _id, data } = attesterDescription
      res.json(JSON.parse(data))
    } else {
      res.json({
        icon: '',
        name: '',
        description: '',
        url: '',
      })
    }
  }

  app.post('/api/about/:attesterId', catchError(handleSet))
  app.get('/api/about/:attesterId', catchError(handleGet))
}
