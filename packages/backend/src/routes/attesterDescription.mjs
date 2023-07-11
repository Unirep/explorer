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

    const attesterId = req.params.attesterId
    const nonce = req.headers.nonce
    const { icon, url, name, description } = req.headers

    let attesterDescription = JSON.stringify({ icon, name, description, url })

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
      res.send('Contract interface not supported...')
      return
    }

    const hash = ethers.utils.solidityKeccak256(
      ['uint256', 'string'],
      [nonce, description]
    )
    const signature = await wallet.signMessage(ethers.utils.arrayify(hash))

    if (!(await contract.isValidSignature(hash, signature))) {
      res.status(401)
      res.send('Invalid signature....')
      return
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
    res.json({ passed: true })
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
