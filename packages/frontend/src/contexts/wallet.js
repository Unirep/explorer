import { makeAutoObservable } from 'mobx'
import { ethers } from 'ethers'

export default class Wallet {
  address = ''
  errorMsg = ''

  constructor(state) {
    makeAutoObservable(this)
    this.state = state
  }

  async load() {
    try {
      const walletResponse = await this.connectWallet()
      this.address = walletResponse.address
      this.addWalletListener()
      console.log(this.address)
    } catch (e) {
      this.errorMsg = e.message
      window.alert(this.errorMsg)
    }
  }

  async connectWallet() {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const obj = {
          address: addressArray[0],
        }
        return obj
      } catch (err) {
        throw err
      }
    } else {
      throw new Error('please install a Metamask wallet in your browser.')
    }
  }

  addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          this.address = accounts[0]
          this.errorMsg = ''
        } else {
          this.address = ''
        }
      })
    } else {
      throw Error('please install a Metamask wallet in your browser.')
    }
  }

  async signMessage(message) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const signatureHash = await signer.signMessage(message)
      const address = await signer.getAddress()
      return {
        message,
        signatureHash,
        address,
      }
    } catch (err) {
      window.alert(err.message)
    }
  }
}
