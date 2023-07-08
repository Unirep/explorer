const path = require('path')
const url = require('url')
const fs = require('fs')

const {
  abi,
} = require('../artifacts/contracts/AttesterDescription.sol/AttesterDescription.json')

fs.writeFileSync(
  path.join(__dirname, `../src/abi/AttesterDescription.json`),
  JSON.stringify(abi)
)
