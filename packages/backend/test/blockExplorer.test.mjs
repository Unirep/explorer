import {
  BlockExplorer,
  getAttesterSignUpEvents,
} from '../src/helpers/blockExplorer.mjs'
import { expect } from 'chai'
import { hexlify, randomBytes } from 'ethers/lib/utils.js'
import { DEPLOYER_ADDRESS } from './environment.mjs'
import { UNIREP_ADDRESS } from '../src/config.mjs'

describe('Block Explorer Tests', function () {
  it('should get `AttesterSignUp` events for unirep contract', async () => {
    const signUpEvents = await Promise.all(
      Object.entries(BlockExplorer).map(async ([_, provider]) =>
        getAttesterSignUpEvents(provider, UNIREP_ADDRESS, DEPLOYER_ADDRESS)
      )
    )

    signUpEvents.forEach((a) => expect(a.length).to.be.greaterThan(0))
  })
  it('should not get `AttesterSignUp` events for random address', async () => {
    const attesterId = hexlify(randomBytes(32))
    const signUpEvents = await Promise.all(
      Object.entries(BlockExplorer).map(async ([_, provider]) =>
        getAttesterSignUpEvents(provider, UNIREP_ADDRESS, attesterId)
      )
    )

    signUpEvents.forEach((a) => expect(a.length).equals(0))
  })
})
