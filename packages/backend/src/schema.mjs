import { nanoid } from 'nanoid'
import { schema } from '@unirep/core'

export default [
  {
    name: 'BlockTimestamp',
    primaryKey: 'number',
    rows: [
      ['number', 'Int'],
      ['network', 'String'],
      {
        name: 'timestamp',
        type: 'Int',
        default: 0,
      },
    ],
  },
  {
    name: 'GlobalData',
    primaryKey: '_id',
    rows: [
      {
        name: '_id',
        type: 'String',
        default: () => nanoid(),
      },
      ['data', 'String'],
    ],
  },
  {
    name: 'NetworkData',
    primaryKey: 'network',
    rows: [
      ['network', 'String'],
      ['stateTreeDepth', 'Int'],
      ['epochTreeDepth', 'Int'],
      ['historyTreeDepth', 'Int'],
      ['numEpochKeyNoncePerEpoch', 'Int'],
      ['fieldCount', 'Int'],
      ['sumFieldCount', 'Int'],
      ['replNonceBits', 'Int'],
      ['replFieldBits', 'Int'],
    ],
  },
  {
    name: 'AttesterData',
    primaryKey: '_id',
    rows: [
      {
        name: '_id',
        type: 'String',
        default: () => nanoid(),
      },
      ['data', 'String'],
    ],
  },
  {
    name: 'AttesterDescription',
    primaryKey: '_id',
    rows: [
      {
        name: '_id',
        type: 'String',
        default: () => nanoid(),
      },
      ['name', 'String'],
      ['attesterId', 'String'],
      ['network', 'String'],
      ['url', 'String'],
      ['icon', 'String'],
      ['description', 'String'],
    ],
  },
  ...schema,
]
