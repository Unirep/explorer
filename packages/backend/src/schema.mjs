import { nanoid } from 'nanoid'

const _schema = [
  {
    name: 'SynchronizerState',
    rows: [
      ['attesterId', 'String', { unique: true }],
      ['latestProcessedBlock', 'Int'],
      ['latestProcessedTransactionIndex', 'Int'],
      ['latestProcessedEventIndex', 'Int'],
      ['latestCompleteBlock', 'Int'],
    ],
  },
  {
    name: 'Attestation',
    indexes: [{ keys: ['index'] }, { keys: ['index', 'epochKey', 'epoch'] }],
    rows: [
      ['epoch', 'Int', { optional: true }],
      ['epochKey', 'String', { optional: true }],
      ['index', 'String'],
      ['attester', 'String', { optional: true }],
      ['attesterId', 'String', { optional: true }],
      ['posRep', 'Int', { optional: true }],
      ['negRep', 'Int', { optional: true }],
      ['graffiti', 'String', { optional: true }],
      ['hash', 'String'],
      ['timestamp', 'Int'],
    ],
  },
  {
    name: 'StateTreeLeaf',
    indexes: [{ keys: ['index'] }],
    rows: [
      ['epoch', 'Int'],
      ['hash', 'String'],
      ['index', 'Int'],
      ['attesterId', 'String'],
      ['timestamp', 'Int'],
    ],
  },
  {
    name: 'EpochTreeLeaf',
    primaryKey: 'id',
    rows: [
      ['id', 'String'],
      ['epoch', 'Int'],
      ['hash', 'String'],
      ['index', 'String'],
      ['attesterId', 'String'],
      ['epochKey', 'String'],
      ['posRep', 'String'],
      ['negRep', 'String'],
      ['graffiti', 'String'],
      ['timestamp', 'Int'],
    ],
  },
  {
    name: 'Epoch',
    indexes: [{ keys: ['number', 'attesterId'] }],
    rows: [
      ['number', 'Int'],
      ['attesterId', 'String'],
      ['sealed', 'Bool'],
      ['timestamp', 'Int'],
    ],
  },
  {
    name: 'Nullifier',
    rows: [
      ['epoch', 'Int'],
      ['attesterId', 'String'],
      ['nullifier', 'String', { unique: true }],
      ['transactionHash', 'String', { optional: true }],
      ['timestamp', 'Int'],
    ],
  },
  {
    name: 'UserSignUp',
    indexes: [{ keys: ['commitment', 'attesterId'] }],
    rows: [
      ['commitment', 'String', { index: true }],
      ['epoch', 'Int'],
      ['attesterId', 'String'],
      ['timestamp', 'Int'],
    ],
  },
  {
    name: 'BlockTimestamp',
    primaryKey: 'number',
    rows: [
      ['number', 'Int'],
      ['timestamp', 'Int'],
    ],
  },
  {
    name: 'Attester',
    primaryKey: '_id',
    rows: [
      ['startTimestamp', 'Int'],
      ['epochLength', 'Int'],
    ],
  },
  {
    name: 'GlobalData',
    primaryKey: '_id',
    rows: [['data', 'String']],
  },
]

/**
 * The schema of the database that is used in storing Unirep data
 */
export const schema = _schema.map((obj) => ({
  primaryKey: '_id',
  ...obj,
  rows: [
    ...obj.rows,
    {
      name: '_id',
      type: 'String',
      default: () => nanoid(),
    },
  ],
}))
