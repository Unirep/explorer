import catchError from '../helpers/catchError.mjs'
import { localProvider, provider, UNIREP_ADDRESS } from '../config.mjs'
import ethers from 'ethers'
import { attesterDescriptionAbi } from '../helpers/abi.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    // EIP Interface code
    // isValidSignature() -> 0x1626ba7e
    // getDescription() -> 0x1a092541
    // interfaceId() -> 0x0c2f9f3f (isValidSignatureSelector ^ getDescriptionSelector)

    const attesterId = req.params.attesterId
    const token = req.headers.token
    let description = req.headers.description

    console.log('AttesterId', attesterId)

    // const contract = new ethers.Contract(UNIREP_ADDRESS, unirepAbi, provider)
    const signer = localProvider.getSigner()
    const contract = new ethers.Contract(
      attesterId,
      attesterDescriptionAbi,
      signer
    )

    console.log('block number: ', await localProvider.getBlockNumber())
    console.log('code: ', await localProvider.getCode(attesterId))

    const supportsInterface =
      typeof contract.supportsInterface === 'function'
        ? await contract.supportsInterface('0x0c2f9f3f')
        : false

    let didSetDescription = false,
      validSig = false,
      invalidSig = false

    const hash = ethers.utils.keccak256(
      ethers.utils.solidityPack(
        ['uint256', 'string', 'address'],
        [token, description, attesterId]
      )
    )
    const hash2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('0'))
    const signature = ethers.utils.keccak256(hash)

    console.log(hash, signature)
    if (supportsInterface) {
      didSetDescription = await contract.setDescription(
        hash,
        signature,
        description
      )

      validSig = await contract.isValidSignature(hash, signature)
      invalidSig = await contract.isValidSignature(hash2, signature)
    }

    description = await contract.getDescription()

    res.json({
      validSig,
      invalidSig,
      supportsInterface,
      description,
    })
  }
  app.get('/api/about/:attesterId', catchError(handler))
}
