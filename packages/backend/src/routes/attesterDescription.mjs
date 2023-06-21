import catchError from '../helpers/catchError.mjs'
import { provider, UNIREP_ADDRESS } from '../config.mjs'
import ethers from 'ethers'
import { unirepAbi } from '../helpers/abi.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    // EIP Interface code
    // isValidSignature() -> 0x1626ba7e
    // getDescription() -> 0x1a092541
    // interfaceId() -> 0x0c2f9f3f (isValidSignatureSelector ^ getDescriptionSelector)

    const contract = new ethers.Contract(UNIREP_ADDRESS, unirepAbi, provider)
    const supportsInterface =
      typeof contract.supportsInterface === 'function'
        ? await contract.supportsInterface('0x0c2f9f3f')
        : false

    const magicValue = '0x20c13b0b'
    let verified = false,
      description = ''

    if (supportsInterface) {
      verified =
        magicValue ==
        (await contract.isValidSignature(
          req.headers.hash.toString(16),
          req.headers.signature.toString(16)
        ))

      if (verified) {
        description = await contract.getDescription()
      }
    }

    res.json({
      description: description,
    })
  }
  app.get('/api/about/', catchError(handler))
}
