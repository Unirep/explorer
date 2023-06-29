import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Header from '../components/Header'
import UnirepInfo from '../components/UnirepInfo'
import InfoCard from '../components/InfoCard'
import LastDeploymentCard from '../components/LastDeploymentCard'
import LastAttestationCard from '../components/LastAttestationCard'
import UnirepEvent from '../components/UnirepEvent'
import Footer from '../components/Footer'
import measure from '../utils/measure-text'

export default observer(() => {
  const { info, unirep } = useContext(state)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        unirep.loadStats(),
        unirep.loadAllAttestations(),
        unirep.loadAttesterDeployments(),
      ])
    }

    const onWindowResize = () => {
      setIsMobile(window.innerWidth < 600)
    }

    loadData()
    window.addEventListener('resize', onWindowResize)
  }, [])

  return (
    <div className="content">
      <Header />
      <div className="container">
        <div className="left-container">
          <h1>Explorer</h1>
          <p style={{ fontSize: '1.1em' }}>
            UniRep Explorer is a utility for discovering apps built on the
            protocol & inspecting the anonymous Universal Reputation system
            being built for all.
          </p>
          <p style={{ fontWeight: '500' }}>Ready to build your own?</p>
          <a
            style={{ color: '#669294' }}
            href="https://github.com/Unirep/create-unirep-app"
            target="blank"
          >
            Get started here.
          </a>
          <div className="">
            <img src={require('../../public/hero_img.svg')} alt="bird image" />
          </div>
          <UnirepInfo info={info} />
        </div>

        <div className="right-container">
          <h3>Overview</h3>
          <div className="info-grid">
            <InfoCard
              heading="Total Attesters/Apps"
              value1={unirep.attesterCount ?? 0}
            />
            <InfoCard
              heading="Total Sign Ups"
              value1={unirep.signUpCount ?? 0}
            />
            <InfoCard
              heading="Total Attestations"
              value1={unirep.attestationCount ?? 0}
            />
            <InfoCard
              heading="Total Bytes Given"
              value1={unirep.totalBytes ?? 0}
            />
            <LastDeploymentCard />
            <LastAttestationCard />
          </div>

          {/* TODO: create graph element for Unirep contract stats according to upcoming design revision */}
          {/* <h3>Stats</h3>
          <div className="graph-container">
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <ul>
                <div style={{ paddingBottom: '20px' }}>
                  ATTESTER DEPLOYMENTS:
                </div>
                {unirep.deploymentIds.map((id) => (
                  <li key={id}>
                    {unirep.deploymentsById.get(id).startTimestamp}
                  </li>
                ))}
              </ul>
              <ul>
                <div style={{ paddingBottom: '20px' }}>USER SIGNUPS:</div>
                {unirep.allSignUps.map(({ _id, timestamp }) => (
                  <li key={_id}>
                    {dayjs(timestamp * 1000).format('MM-DD-YYYY HH:mm:ss')}
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          <h3>Attestations</h3>
          <div className="events-header">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: `${measure('0xca939...6132f', {
                  fontSize: '0.9em',
                  margin: '0.4em',
                })}px`,
              }}
            >
              <h4>Attester</h4>
            </div>

            {!isMobile && <h4 style={{ width: `50px` }}>Epoch</h4>}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: `${measure('0xca939...6132f', {
                  fontSize: '0.9em',
                  margin: '0.4em',
                })}px`,
              }}
            >
              <h4>Epoch Key</h4>
            </div>
            {!isMobile && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '80px',
                }}
              >
                <h4>Change</h4>
                <div style={{ width: '4px' }} />
                {/* TODO: implement changing display order of events */}
                {/* <img
                src={require('../../public/arrow_up_down.svg')}
                alt="arrow change order of display"
              /> */}
              </div>
            )}
            {!isMobile && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: `100px`,
                }}
              >
                <h4>Timestamp</h4>
              </div>
            )}
          </div>
          <div>
            {unirep.attestationIds.map((id) => (
              <UnirepEvent key={id} id={id} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
})
