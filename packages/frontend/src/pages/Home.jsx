import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import UnirepInfo from '../components/UnirepInfo'
import InfoCard from '../components/InfoCard'
import UnirepEvent from '../components/UnirepEvent'
import Footer from '../components/Footer'
import measure from '../utils/measure-text'
import dayjs from 'dayjs'

export default observer(() => {
  const { info, unirep } = useContext(state)
  // const [signups, setSignups] = useState()

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        // await unirep.loadAllSignUps();
        await unirep.loadAttesterDeployments(),
        await unirep.loadAllAttestations(),
        // await unirep.loadAllEpochs()
        // setSignups(unirep.signUpsByAttesterId)
      ])
    }
    loadData()
  }, [])

  const lastDeploymentId = unirep.deploymentIds[0]
  const latestAttester = unirep.deploymentsById.get(lastDeploymentId)
  const lastAttestationId = unirep.attestationIds[0]
  const lastAttestation = unirep.attestationsById.get(lastAttestationId)

  return (
    <>
      <div className="container">
        <div className="left-container">
          <h1>Terminal</h1>
          <p style={{ fontSize: '1.1em' }}>
            UniRep Terminal is utility for discovering apps built on the
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
              value1={unirep.deploymentIds.length}
            />
            <InfoCard
              heading="Total Sign Ups"
              value1={unirep.allSignUps.length}
            />
            <InfoCard
              heading="Total Attestations"
              value1={unirep.attestationCount}
            />
            <InfoCard
              heading="Total Reputation Processed"
              value1={unirep.totalPosRep - unirep.totalNegRep}
              value2={unirep.totalPosRep}
              value3={unirep.totalNegRep}
            />
            <div className="info-card">
              <h4>Latest Attester</h4>
              <div className="flex">
                <h5>Deployed on</h5>
                {latestAttester ? (
                  <h6>
                    {dayjs(latestAttester.startTimestamp * 1000).format(
                      'MMM D, YYYY'
                    )}
                  </h6>
                ) : null}
                {latestAttester ? null : <h5>Loading...</h5>}
              </div>
              <div className="flex">
                <h5>Contract address</h5>
                {latestAttester ? (
                  <h6>
                    <span>
                      {`0x${BigInt(latestAttester._id).toString(16)}`.slice(
                        0,
                        7
                      )}
                    </span>
                    ...
                    <span>
                      {`0x${BigInt(latestAttester._id).toString(16)}`.slice(-5)}{' '}
                    </span>
                    <a
                      href={`https://goerli.arbiscan.io/address/0x${BigInt(
                        latestAttester._id
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
                {latestAttester ? null : <h5>Loading...</h5>}
              </div>
            </div>

            <div className="info-card">
              <h4>Lastest Attestation</h4>
              <div className="flex">
                <h5>Submitted</h5>
                {lastAttestation ? (
                  <h6>
                    {dayjs(lastAttestation.timestamp * 1000).format(
                      'MMM D, YYYY'
                    )}
                  </h6>
                ) : null}
                {lastAttestation ? null : <h5>Loading...</h5>}
              </div>
              <div className="flex">
                <h5>By Attester</h5>
                {lastAttestation ? (
                  <h6>
                    <span>
                      {`0x${BigInt(lastAttestation.attesterId).toString(
                        16
                      )}`.slice(0, 5)}
                    </span>
                    ...
                    <span>
                      {`0x${BigInt(lastAttestation.attesterId).toString(
                        16
                      )}`.slice(-5)}{' '}
                    </span>
                  </h6>
                ) : null}
                {lastAttestation ? null : <h5>Loading...</h5>}
              </div>
            </div>
          </div>

          <h3>Stats</h3>
          <div className="graph-container">
            {/* <ul>SIGNUPS TO EACH ATTESTER:
              {unirep.signUpsByAttesterId ?
                [...unirep.signUpsByAttesterId.entries()].map((key, {value}) => (
                  // unirep.signUpsByAttesterId.get(key).map(({ value }) => (
                    <li key={key}>attester: {key.slice(0, 5)}..  #signups: {}</li>
                  // ))
              )) : null}

              {unirep.signUpsByAttesterId ?
                null :
                <li>There were no signups to this attester.</li>
              }
            </ul> */}
            <ul>
              NEED:
              <li>timestamps of attesters deployed</li>
              <li>timestamps of signups to each attester</li>
            </ul>
          </div>

          <h3>Latest Attestations</h3>
          <div className="flex events-header">
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
            <h4 style={{ width: `50px` }}>Epoch</h4>
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '80px',
              }}
            >
              <h4>Change</h4>
              <div style={{ width: '4px' }} />
              <img
                src={require('../../public/arrow_up_down.svg')}
                alt="arrow change order of display"
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: `100px`,
              }}
            >
              <h4>Timestamp</h4>
            </div>
          </div>
          <div>
            {unirep.attestationIds.map((id) => (
              <UnirepEvent key={id} id={id} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
})
