import fs from 'fs'
import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export const unirepAbi = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../abi/Unirep.json'), 'utf8')
)
export const attesterDescriptionAbi = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../abi/AttesterDescription.json'),
    'utf8'
  )
)
