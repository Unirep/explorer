import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Header from '../components/Header'
import Tooltip from '../components/Tooltip'
import UserEvent from '../components/UserEvent'
import Footer from '../components/Footer'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default observer(() => {
  const { id } = useParams()
  const userId = BigInt(id).toString()
  const { unirep, info } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      !unirep.signUpsByUserId.has(userId)
        ? await unirep.loadSignUpsByUser(userId, info.network)
        : null
    }
    loadData()
  }, [info.network])
  const signups = unirep.signUpsByUserId.get(userId)

  return (
    <div className="content">
      <Header />
      <div className="container">
        <div className="left-container">
          <h3>User</h3>
          <div className="info-card">
            <h4>User Information</h4>
            <div className="flex">
              <h5>Onboard to UniRep</h5>
              <h6>
                {signups
                  ? dayjs(
                      Math.min(...signups.map((s) => +s.blockTimestamp)) * 1000
                    ).from(dayjs())
                  : 'Loading...'}
              </h6>
            </div>
            <div className="flex">
              <h5>Attesters Joined</h5>
              <h6>{signups ? signups.length : 'Loading...'}</h6>
            </div>
            <div className="flex">
              <h5>Semaphore ID</h5>
              <Tooltip
                text="An identity commitment is a public value used in Semaphore groups to represent the identity of a group member."
                maxWidth={200}
              />
            </div>
            <h6 className="break">{id}</h6>
          </div>
        </div>

        <div className="right-container">
          <h3 style={{ marginBottom: '2%' }}>History</h3>
          <div className="flex events-header">
            <h4>signed up to attester</h4>
            <h4>at epoch #</h4>
            <h4>time</h4>
          </div>
          <div className="scroll">
            {signups
              ? signups.map((signup) => (
                  <UserEvent key={signup._id} signup={signup} />
                ))
              : null}
            {signups ? null : 'Loading...'}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
})
