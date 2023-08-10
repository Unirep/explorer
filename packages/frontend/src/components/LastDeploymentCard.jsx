import React from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import { NETWORK } from '../contexts/utils'
import dayjs from 'dayjs'
import shortenId from '../utils/shorten-id'

export default observer(({ network }) => {
  const { unirep, ui } = React.useContext(state)
  const id = unirep.deploymentIds.slice(-1)[0]
  const lastDeployment = unirep.deploymentsById.get(id)

  return (
    <div className="info-card">
      <h4>Latest Attester</h4>
      <div className="flex">
        <h5>Deployed on</h5>
        {lastDeployment ? (
          <h6>
            {dayjs(+lastDeployment.startTimestamp * 1000).format('MMM D, YYYY')}
          </h6>
        ) : null}
        {lastDeployment ? null : <h5>Loading...</h5>}
      </div>
      <div className="flex">
        <h5>Contract address</h5>
        {lastDeployment ? (
          <h6>
            {shortenId(
              `0x${BigInt(lastDeployment.attesterId).toString(16)}`,
              ui.isMobile
            )}
            <a
              href={`${NETWORK[network].explorer}/address/0x${BigInt(
                lastDeployment.attesterId
              )
                .toString(16)
                .padStart(40, '0')}`}
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
