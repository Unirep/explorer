import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import InfoCard from '../components/InfoCard'
import EpochView from '../components/EpochView'
import UserView from '../components/UserView'
import Footer from '../components/Footer'
import dayjs from 'dayjs'

export default observer(() => {
  const { id } = useParams()
  const attesterId = BigInt(id).toString(10)
  const { unirep, attester } = useContext(state)
  const [selectedView, setSelectedView] = useState('Epoch')
  const [currentEpoch, setCurrentEpoch] = useState(0)
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        !unirep.deploymentsById.has(attesterId)
          ? unirep.loadAttesterDeployments()
          : null,
        attester.loadEpochsByAttester(attesterId),
        attester.loadSignUpsByAttester(attesterId),
        attester.loadAttestationsByAttester(attesterId),
        attester.loadUSTByAttester(attesterId),
      ])
      setCurrentEpoch(
        attester.epochsByAttester[attester.epochsByAttester.length - 1].number
      )
    }
    loadData()
  }, [])

  const deployment = unirep.deploymentsById.get(attesterId)

  return (
    <>
      <div className="container">
        <div className="left-container">
          <h3>Attester</h3>
          <div className="info-card">
            <h4>Attester Information</h4>
            <div className="flex">
              <h5>Deployed on</h5>
              {deployment ? (
                <h6>
                  {dayjs(deployment.startTimestamp * 1000).format(
                    'MMM D, YYYY'
                  )}
                </h6>
              ) : null}
              {deployment ? null : <h5>Loading...</h5>}
            </div>
            <div className="flex">
              <h5>Address</h5>
              <h6>
                <span>{id.slice(0, 7)}</span>...<span>{id.slice(-5)} </span>
                <a
                  href={`https://goerli.arbiscan.io/address/${id}`}
                  target="blank"
                >
                  <img
                    src={require('../../public/arrow_up_right.svg')}
                    alt="arrow up right"
                  />
                </a>
              </h6>
            </div>
          </div>
        </div>

        <div className="right-container">
          <h3>Overview</h3>
          <div className="info-grid">
            {/* currently showing previous epoch, not last processed */}
            <InfoCard heading="Epochs Processed" value1={currentEpoch - 1} />
            <InfoCard
              heading="Total Rep Given"
              value1={attester.totalPosRep - attester.totalNegRep}
              value2={attester.totalPosRep}
              value3={attester.totalNegRep}
            />
            <InfoCard
              heading="Total Users Signed Up"
              value1={attester.signUpIds.length}
            />
            <div className="info-card">
              <div className="flex">
                <h4>Hashchain Status</h4>
                {/* <Tooltip /> */}
              </div>
              <div className="flex">
                <h5>Average Delay</h5>
                <h6>--:--</h6>
              </div>
              <div className="flex">
                <h5>Status</h5>
                <h6>
                  Unknown
                  {/* <span className="dot"></span> */}
                </h6>
              </div>
            </div>
          </div>
          {selectedView === 'Epoch' ? (
            <>
              <div style={{ display: 'flex' }}>
                <h3
                  onClick={() => setSelectedView('Epoch')}
                  className="selected"
                  style={{ marginRight: '30px' }}
                >
                  Epoch
                </h3>
                <h3
                  onClick={() => setSelectedView('User')}
                  className="unselected"
                >
                  Users
                </h3>
              </div>
              {deployment ? <EpochView deployment={deployment} /> : null}
              {deployment ? null : 'Loading...'}
            </>
          ) : (
            <>
              <div style={{ display: 'flex', marginBottom: '2%' }}>
                <h3
                  onClick={() => setSelectedView('Epoch')}
                  className="unselected"
                  style={{ marginRight: '30px' }}
                >
                  Epoch
                </h3>
                <h3
                  onClick={() => setSelectedView('User')}
                  className="selected"
                >
                  Users
                </h3>
              </div>
              <UserView />
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
})
