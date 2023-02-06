export default async (objs, db) => {
  const timestamps = await db.findMany('BlockTimestamp', {
    where: {
      number: objs.map(({ blockNumber }) => blockNumber),
    },
  })
  const timestampsByBlock = timestamps.reduce((acc, o) => {
    return {
      [o.number]: o.timestamp,
      ...acc,
    }
  }, {})
  return objs.map((o) => ({
    ...o,
    timestamp: timestampsByBlock[o.blockNumber.toString()],
  }))
}
