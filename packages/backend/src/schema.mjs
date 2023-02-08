import { nanoid } from 'nanoid'
import { schema } from '@unirep/core'

export default [
  {
    name: 'BlockTimestamp',
    primaryKey: 'number',
    rows: [
      ['number', 'Int'],
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
  ...schema,
]
