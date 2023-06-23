import solc from 'solc'
import fs from 'fs'
import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export const compileContract = (contractName) => {
  const fileName = contractName + '.sol'
  const fileContents = fs.readFileSync(
    path.join(__dirname, `../../contracts/${fileName}`),
    'utf8'
  )
  const strippedFileContents = fileContents
    .split('\n')
    .filter((s, i) => i > 0 && s.search('//') == -1)
    .join(' ')

  const sources = {}
  sources[fileName] = {}
  sources[fileName]['content'] = strippedFileContents

  const input = {
    language: 'Solidity',
    sources: sources,
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  }

  var output = JSON.parse(solc.compile(JSON.stringify(input)))

  return {
    abi: output.contracts[fileName][contractName].abi,
    bytecode: output.contracts[fileName][contractName].evm.bytecode.object,
  }
}
