require('@nomicfoundation/hardhat-toolbox')

module.exports = {
  defaultNetwork: 'arb',
  networks: {
    hardhat: {
      blockGasLimit: 12000000,
      chainId: 421613, // match arb goerli
    },
    local: {
      url: 'http://localhost:8545',
      blockGasLimit: 12000000,
      chainId: 421613, // match arb goerli
      accounts: [
        '0xbca43b51928100e446f2265f1493c3e9187d62eb26ef043f8ecbae6cb27e4f51',
      ],
    },
    arb: {
      url: 'https://arb-goerli.g.alchemy.com/v2/hfFfXlX8rR8YvrALiJ8b7ZtIPRGY1GTM',
      accounts: [
        '0x0f70e777f814334daa4456ac32b9a1fdca75ae07f70c2e6cef92679bad06c88b',
      ],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: { enabled: true, runs: 2 ** 32 - 1 },
        },
      },
    ],
  },
}
