import { ethers } from 'ethers'
import fetch from 'node-fetch'
import catchError from '../helpers/catchError.mjs'
import { BlockExplorer, getDeployer } from '../helpers/blockExplorer.mjs'
import { hashMessage } from '@ethersproject/hash'

export default ({ app, db, synchronizer }) => {
  const handleSet = async (req, res) => {
    const attesterId = req.params.attesterId
    const { icon, url, name, description, nonce, signature, network } =
      req.headers
    const _id = attesterId + network

    let passed = true

    const validUrl = await fetch(url).catch(() => false)

    if (!validUrl) {
      res.status(401)
      passed = false
    }

    const hash = hashMessage(
      ethers.utils.solidityKeccak256(
        ['uint256', 'string'],
        [nonce, description]
      )
    )

    const deployer = await getDeployer(BlockExplorer[network], attesterId)
    if (
      deployer == '0x' ||
      !(ethers.utils.recoverAddress(hash, signature).toLowerCase() == deployer)
    ) {
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
