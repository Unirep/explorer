import catchError from '../helpers/catchError.mjs'
import { localProvider, provider, UNIREP_ADDRESS } from '../config.mjs'
import ethers from 'ethers'
import { attesterDescriptionAbi } from '../helpers/abi.mjs'
import { isValidAttesterDescription } from '../helpers/attesterDescriptionVerifier.mjs'

export default ({ app, db, synchronizer }) => {
  const handleSet = async (req, res) => {
    // EIP Interface code
    // isValidSignatureSelector 0xe0c5e6c3
    // getDescriptionSelector 0x1a092541
    // setDescriptionSelector 0xf0d3533b
    // interfaceId 0x0a1f90b9

    const attesterId = req.params.attesterId
    const token = req.headers.token
    const { icon, url, name, description } = req.headers

    if (!isValidAttesterDescription(icon, name, description, url)) {
      res.status(422)
      res.send('Invalid attester description...')
    }

    let attesterDescription = JSON.stringify({ icon, name, description, url })

    const signer = localProvider.getSigner()
    // const signer = provider.getSigner()
    const contract = new ethers.Contract(
      attesterId,
      attesterDescriptionAbi,
      signer
    )

    const supportsInterface =
      typeof contract.supportsInterface === 'function'
        ? await contract.supportsInterface('0x0a1f90b9')
        : false

    let validSignature = false

    const hash = ethers.utils.keccak256(
      ethers.utils.solidityPack(
        ['uint256', 'string', 'address'],
        [token, description, attesterId]
      )
    )

    const signature = ethers.utils.keccak256(hash)

    if (supportsInterface) {
      let _ = await contract.setDescription(
        hash,
        signature,
        attesterDescription
      )
      validSignature = await contract.isValidSignature(hash, signature)
      attesterDescription = await contract.getDescription()
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

    res.json({
      validSignature,
      supportsInterface,
    })
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
