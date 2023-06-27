import catchError from '../helpers/catchError.mjs'
import { localProvider, provider, UNIREP_ADDRESS } from '../config.mjs'
import ethers from 'ethers'
import { attesterDescriptionAbi } from '../helpers/abi.mjs'

export default ({ app, db, synchronizer }) => {
  const handleSet = async (req, res) => {
    // EIP Interface code
    // isValidSignatureSelector 0xe0c5e6c3
    // getDescriptionSelector 0x1a092541
    // setDescriptionSelector 0xf0d3533b
    // interfaceId 0x0a1f90b9

    const attesterId = req.params.attesterId
    const token = req.headers.token
    let description = req.headers.description

    const signer = localProvider.getSigner()
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
      let _ = await contract.setDescription(hash, signature, description)
      validSignature = await contract.isValidSignature(hash, signature)
      description = await contract.getDescription()
    }

    res.json({
      validSignature,
      supportsInterface,
      description,
    })
  }

  const handleGet = async (req, res) => {
    const attesterId = req.params.attesterId

    const signer = localProvider.getSigner()
    const contract = new ethers.Contract(
      attesterId,
      attesterDescriptionAbi,
      signer
    )

    const supportsInterface =
      typeof contract.supportsInterface === 'function'
        ? await contract.supportsInterface('0x0a1f90b9')
        : false

    let description = ''
    if (supportsInterface) {
      description = await contract.getDescription()
    }
    res.json({
      supportsInterface,
      description,
    })
  }

  app.post('/api/about/:attesterId', catchError(handleSet))
  app.get('/api/about/:attesterId', catchError(handleGet))
}
