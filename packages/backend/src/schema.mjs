import { nanoid } from 'nanoid'
import { schema } from '@unirep/core'

export default [
  {
    name: 'BlockTimestamp',
    primaryKey: 'number',
    rows: [
      ['number', 'Int'],
      ['timestamp', 'Int'],
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
  ...schema,
]
