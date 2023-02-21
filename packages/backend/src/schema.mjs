import { nanoid } from 'nanoid'
import { schema } from '@unirep/core'

const _schema = schema.map((r) => {
  if (r.name !== 'Epoch') return r
  return {
    name: 'Epoch',
    indexes: [{ keys: ['attesterId', 'number'] }],
    rows: [
      ['number', 'Int'],
      ['attesterId', 'String'],
      ['sealed', 'Bool'],
    ],
  }
})

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
  ..._schema,
]
