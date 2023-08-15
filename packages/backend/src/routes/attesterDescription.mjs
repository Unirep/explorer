import { ethers } from 'ethers'
import fetch from 'node-fetch'
import catchError from '../helpers/catchError.mjs'
import { getDeployer } from '../helpers/blockExplorer.mjs'
import { hashMessage } from '@ethersproject/hash'
import { NETWORK } from '../config.mjs'

export default ({ app, db }) => {
  const handleSet = async (req, res) => {
    const attesterId = req.params.attesterId
    const { icon, url, name, description, nonce, signature, network } = req.body
    const _id = attesterId + network

    let passed = true

    if (url) {
      const validUrl = await fetch(`https://${url}`).catch(() => false)
      if (!validUrl) {
        res.status(401).json({ passed: false, error: 'Invalid Url' })
        return
      }
    }

    const hash = hashMessage(
      ethers.utils.solidityKeccak256(
        ['uint256', 'string'],
        [nonce, description]
      )
    )

    if (!NETWORK[network]) {
      res.status(401).json({ passed: false, error: 'Network not found' })
      return
    }
    const deployer = await getDeployer(network, attesterId)
    if (
      deployer == '0x' ||
      !(ethers.utils.recoverAddress(hash, signature) == deployer)
    ) {
      res
        .status(401)
        .json({ passed: false, error: 'Deployer and signature do not match' })
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
