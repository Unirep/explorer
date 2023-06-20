import catchError from '../helpers/catchError.mjs'
import { provider, UNIREP_ADDRESS } from '../config.mjs'
import ethers from 'ethers'
import { unirepAbi } from '../helpers/abi.mjs'

export default ({ app, db, synchronizer }) => {
  const handler = async (req, res) => {
    const attesterId = req.params.attesterId

    // EIP Interface code
    const token =
      '0x01ffc9a701ffc9a700000000000000000000000000000000000000000000000000000000'
    const hex = '0x' + Number(attesterId).toString(16)
    const check = `function attesterMemberCount(${hex}) public view returns (uint256)`
    const func = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(check))

    const a = await provider.call({ to: hex, data: func })
    res.json({
      attesterId: attesterId,
      hex: hex,
      methodSignature: check,
      encodedMethodSignature: func,
      providerCall: a,
    })
  }
  app.get('/api/test/:attesterId', catchError(handler))
}
