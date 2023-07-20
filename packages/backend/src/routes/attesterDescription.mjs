import { ethers } from 'ethers'
import fetch from 'node-fetch'
import catchError from '../helpers/catchError.mjs'
import {
  localProvider,
  provider,
  UNIREP_ADDRESS,
  APP_ADDRESS,
  wallet,
} from '../config.mjs'
import { attesterDescriptionAbi } from '../helpers/abi.mjs'

export default ({ app, db, synchronizer }) => {
  const handleSet = async (req, res) => {
    // EIP Interface code
    // isValidSignatureSelector 0xe0c5e6c3
    // getDescriptionSelector 0x1a092541
    // setDescriptionSelector 0xf0d3533b
    // interfaceId 0x93c93c46
    // wallet signature: 0xb12f4be8935bc6f58e9b013472451f31791cce7c59f6c78b869aa67e6168dc3b4de9b5d7e3675de2b87ca0ae7e56871f9daeb0ac512cb55af58dce0729754fc51b

    const attesterId = req.params.attesterId
    const { icon, url, name, description, nonce, signature, network } =
      req.headers
    const _id = attesterId + network

    let passed = true

    const contract = new ethers.Contract(
      APP_ADDRESS,
      attesterDescriptionAbi,
      wallet
    )

    const validUrl = fetch(url)
      .then(() => true)
      .catch(() => false)

    if (!validUrl) {
      res.status(401)
      passed = false
    }

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

    if (!passed) {
      res.json({ passed })
      return
    }

    const _attesterDescription = await db.findOne('AttesterDescription', {
      where: {
        _id,
      },
    })

    if (_attesterDescription) {
      await db.update('AttesterDescription', {
        where: {
          _id,
        },
        update: {
          name,
          attesterId,
          network,
          url,
          icon,
          description,
        },
      })
    } else {
      await db.create('AttesterDescription', {
        _id,
        name,
        attesterId,
        network,
        url,
        icon,
        description,
      })
    }

    res.status(200)
    res.json({ passed })
  }

  const handleGet = async (req, res) => {
    const attesterId = req.params.attesterId
    const { network } = req.headers
    const _id = attesterId + network

    const attesterDescription = await db.findOne('AttesterDescription', {
      where: {
        _id,
      },
    })

    if (attesterDescription) {
      const { id, icon, name, description, url, network } = attesterDescription
      res.json({ icon, name, description, url, network })
    } else {
      res.json({
        icon: '',
        name: '',
        description: '',
        url: '',
        network: '',
      })
    }
  }

  app.post('/api/about/:attesterId', catchError(handleSet))
  app.get('/api/about/:attesterId', catchError(handleGet))
}
