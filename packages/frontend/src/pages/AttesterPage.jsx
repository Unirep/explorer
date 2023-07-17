import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import shortenId from '../utils/shorten-id'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'
import EpochTime from '../components/EpochTime'
import EpochView from '../components/EpochView'
import UserView from '../components/UserView'
import Footer from '../components/Footer'
import dayjs from 'dayjs'

export default observer(() => {
  const { id } = useParams()
  const attesterId = BigInt(id).toString(10)
  const { unirep, attester, ui, info } = useContext(state)
  const [selectedView, setSelectedView] = useState('Attestations')

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        !unirep.deploymentsById.has(attesterId)
          ? unirep.loadAttesterDeployments(info.network)
          : null,
        attester.loadEpochsByAttester(attesterId, info.network),
        attester.loadStats(attesterId, info.network),
        attester.loadSignUpsByAttester(attesterId, info.network),
        attester.loadAttestationsByAttester(attesterId, info.network),
      ])
    }
    loadData()
  }, [info.network])

  const stats = attester.statsById[attesterId] ?? {}

  const deployment = unirep.deploymentsById.get(attesterId)
  const epochIds = [...(attester.epochsByAttesterId.get(attesterId) || [])]
  const lastEpoch = attester.epochsById.get(epochIds.pop())
  return (
    <div className="content">
      <Header />
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
                <span>{shortenId(id, ui.isMobile)}</span>
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
            <InfoCard
              heading="Epochs Processed"
              value1={lastEpoch ? lastEpoch.number : 'Loading...'}
            />
            <InfoCard
              heading="Total Users Signed Up"
              value1={stats.signUpCount}
            />
            <InfoCard
              heading="Total Attestations"
              value1={stats.attestationCount}
            />
            <InfoCard
              heading="Total Bytes Given"
              value1={stats.totalBytes ?? 0}
            />
            {deployment ? <EpochTime deployment={deployment} /> : null}
            {deployment ? null : 'Loading...'}
          </div>

          {selectedView === 'Attestations' ? (
            <>
              <div style={{ display: 'flex' }}>
                <h3
                  onClick={() => setSelectedView('Attestations')}
                  className="selected"
                  style={{ marginRight: '30px' }}
                >
                  Attestations
                </h3>
                <h3
                  onClick={() => setSelectedView('User')}
                  className="unselected"
                >
                  Users
                </h3>
              </div>
              {deployment ? (
                <EpochView attesterId={deployment.attesterId} />
              ) : null}
              {deployment ? null : 'Loading...'}
            </>
          ) : (
            <>
              <div style={{ display: 'flex', marginBottom: '2%' }}>
                <h3
                  onClick={() => setSelectedView('Attestations')}
                  className="unselected"
                  style={{ marginRight: '30px' }}
                >
                  Attestations
                </h3>
                <h3
                  onClick={() => setSelectedView('User')}
                  className="selected"
                >
                  Users
                </h3>
              </div>
              <UserView attesterId={attesterId} />
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
})
