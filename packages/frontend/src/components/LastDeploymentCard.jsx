import React from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import dayjs from 'dayjs'

export default observer(({ id }) => {
  const { unirep } = React.useContext(state)
  const lastDeployment = unirep.deploymentsById.get(id)

  return (
    <div className="info-card">
      <h4>Latest Attester</h4>
      <div className="flex">
        <h5>Deployed on</h5>
        {lastDeployment ? (
          <h6>
            {dayjs(lastDeployment.startTimestamp * 1000).format('MMM D, YYYY')}
          </h6>
        ) : null}
        {lastDeployment ? null : <h5>Loading...</h5>}
      </div>
      <div className="flex">
        <h5>Contract address</h5>
        {lastDeployment ? (
          <h6>
            <span>
              {`0x${BigInt(lastDeployment._id).toString(16)}`.slice(0, 7)}
            </span>
            ...
            <span>
              {`0x${BigInt(lastDeployment._id).toString(16)}`.slice(-5)}{' '}
            </span>
            <a
              href={`https://goerli.arbiscan.io/address/0x${BigInt(
                lastDeployment._id
              ).toString(16)}`}
              target="blank"
            >
              <img
                src={require('../../public/arrow_up_right.svg')}
                alt="arrow up right"
              />
            </a>
          </h6>
        ) : null}
        {lastDeployment ? null : <h5>Loading...</h5>}
      </div>
    </div>
  )
})
