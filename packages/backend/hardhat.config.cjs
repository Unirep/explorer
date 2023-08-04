require('@nomiclabs/hardhat-ethers')

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      blockGasLimit: 12000000,
    },
    local: {
      url: 'http://localhost:8545',
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
}
