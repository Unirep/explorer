require('@nomiclabs/hardhat-ethers')

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      blockGasLimit: 12000000,
    },
    local: {
      url: 'http://127.0.0.1:8545',
      blockGasLimit: 12000000,
      accounts: [],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: { enabled: true, runs: 2 ** 32 - 1 },
        },
      },
    ],
  },
  paths: {
    sources: './test/contract',
  },
}
