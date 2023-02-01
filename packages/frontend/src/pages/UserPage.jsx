import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import UserEvent from '../components/UserEvent'
import Footer from '../components/Footer'

export default observer(() => {
  const { id } = useParams()
  const { unirep, user } = useContext(state)
  const [signups, setSignups] = useState([])
  useEffect(() => {
    const loadData = async () => {
      // if keeping 'user' context:
      // await user.loadSignUpsByUser(id)

      // if no 'user' context:
      // always need to load signups again here?
      // is this more efficient than having separate store for 'user'?
      await unirep.loadAllSignUps()
      setSignups(unirep.signUpsByUserId.get(id))
    }
    loadData()
  }, [])

  return (
    <>
      <div className="container">
        <div className="left-container">
          <h3>User</h3>
          <div className="info-card">
            <h4>User Information</h4>
            <div className="flex">
              <h5>Onboard to UniRep</h5>
              <h6>210 days ago</h6>
            </div>
            <div className="flex">
              <h5>Attesters Joined</h5>
              <h6>{signups.length}</h6>
            </div>
            <div className="flex">
              <h5>Semaphore ID</h5>
              <Tooltip text="Some info goes here" maxWidth={200} />
            </div>
            <h6 className="break">{id}</h6>
          </div>
        </div>

        <div className="right-container">
          <h3 style={{ marginBottom: '2%' }}>History</h3>
          <div className="flex">
            <h4>signed up to attester</h4>
            <h4>at epoch #</h4>
            <h4>time</h4>
          </div>
          <div className="scroll">
            {/* below using list of signups from 'user' context: */}
            {/* {user.signUpsByUser ? 
              user.signUpsByUser.map(({ attesterId, epoch, timestamp }) => (
                <UserEvent key={attesterId} attesterId={attesterId} epoch={epoch} timestamp={timestamp}/>
              )) : null }
            {user.signUpsByUser ? 
              null : 
              'Loading...'
            } */}

            {/* below using mapping 'signUpsByUserId' from 'unirep' context */}
            {signups
              ? signups.map(({ attesterId, epoch, timestamp }) => (
                  <UserEvent
                    key={attesterId}
                    attesterId={attesterId}
                    epoch={epoch}
                    timestamp={timestamp}
                  />
                ))
              : null}
            {signups ? null : 'Loading...'}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
})
