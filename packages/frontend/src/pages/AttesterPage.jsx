import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import { NETWORK } from '../contexts/utils'
import shortenId from '../utils/shorten-id'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'
import EpochTime from '../components/EpochTime'
import EpochView from '../components/EpochView'
import UserView from '../components/UserView'
import Footer from '../components/Footer'
import dayjs from 'dayjs'

export default observer(() => {
  const { id, network } = useParams()
  const attesterId = BigInt(id).toString(10)
  const { unirep, attester, ui } = useContext(state)
  const [selectedView, setSelectedView] = useState('Attestations')

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        unirep.loadAttesterDescription(id, info.network.name),
        !unirep.deploymentsById.has(attesterId)
          ? unirep.loadAttesterDeployments(network)
          : null,
        attester.loadEpochsByAttester(attesterId, network),
        attester.loadStats(attesterId, network),
        attester.loadSignUpsByAttester(attesterId, network),
        attester.loadAttestationsByAttester(attesterId, network),
      ])
    }
    loadData()
  }, [])

  const stats = attester.statsById[attesterId] ?? {}
  const deployment = unirep.deploymentsById.get(attesterId)
  const attesterDesc = unirep.descriptionsByAttesterId.get(id)
  const epochIds = [...(attester.epochsByAttesterId.get(attesterId) || [])]
  const lastEpoch = attester.epochsById.get(epochIds.pop())
  return (
    <div className="content">
      <Header network={network} />
      <div className="container">
        <div className="left-container">
          <h3>Attester</h3>

          {attesterDesc ? (
            <div>
              {attesterDesc.icon !== '' ? (
                <div className="desc-icon">
                  <img
                    height={`${ui.isMobile ? '150' : '320'}`}
                    width={`${ui.isMobile ? '150' : '320'}`}
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      attesterDesc.icon
                    )}`}
                  />
                </div>
              ) : null}
              {<h1>{attesterDesc.name}</h1> || null}
              {<div className="description">{attesterDesc.description}</div> ||
                null}
              {attesterDesc.url ? (
                <div className="desc-link">
                  <a
                    style={{ color: '#83B5B8' }}
                    href={`https://${attesterDesc.url}`}
                    target="blank"
                  >
                    https://{attesterDesc.url}
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}

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
                  href={`${NETWORK[network].explorer}/address/${id}`}
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

          <Link to={`/updateInfo/${id}`}>
            <button className="update">Update Info</button>
          </Link>
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
                <EpochView
                  attesterId={deployment.attesterId}
                  network={network}
                />
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
              <UserView attesterId={attesterId} network={network} />
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
})
