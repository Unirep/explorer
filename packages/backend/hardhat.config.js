require('@nomiclabs/hardhat-ethers')

module.exports = {
  defaultNetwork: 'arb',
  networks: {
    hardhat: {
      blockGasLimit: 12000000,
    },
    local: {
      url: 'http://localhost:8545',
      blockGasLimit: 12000000,
      accounts: [],
    },
    arb: {
      url: 'https://arb-goerli.g.alchemy.com/v2/hfFfXlX8rR8YvrALiJ8b7ZtIPRGY1GTM',
      accounts: [],
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
