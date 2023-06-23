const path = require('path')
const url = require('url')
const fs = require('fs')

const contractNames = ['AttesterDescription']

import('../src/helpers/compileContract.mjs').then((x) => {
  for (const contractName of contractNames) {
    const abi = x.compileContract(contractName).abi
    fs.writeFile(
      path.join(__dirname, `../src/abi/${contractName}.json`),
      JSON.stringify(abi),
      'utf8',
      (err, _) => {
        if (err) console.error(err)
      }
    )
  }
})
