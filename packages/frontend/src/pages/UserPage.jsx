import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import UserEvent from '../components/UserEvent'
import Footer from '../components/Footer'

export default observer(() => { 
  // const { id } = useParams()
  const { info, user } = useContext(state)

  return (
    <>
      <div className='container'>

        <div className='left-container'>
          <h3>User</h3>
          {/* <div>Connected to a server with the following info:</div> */}
          {/* <ul> */}
            {/* <li>Unirep Address: {info.UNIREP_ADDRESS}</li> */}
            {/* <li>Provider URL: {info.ETH_PROVIDER_URL}</li> */}
            {/* <li>User Id: {user.id}</li> */}
            {/* <li>Signed up to Attester: {user.attesterId}</li> */}
            {/* <li>at Epoch: {user.epoch}</li> */}
            {/* <li>with Commitment: {user.commitment}</li> */}
          {/* </ul> */}
          <div className='info-card'>
            <h4>User Information</h4>
            <div className='flex'>
              <h5>Onboard to UniRep</h5>
              <h6>210 days ago</h6>
            </div>
            <div className='flex'>
              <h5>Attesters Joined</h5>
              <h6>1</h6>
            </div>
            <div className='flex'>
              <h5>Semaphore ID</h5>
              <Tooltip text='Some info goes here' maxWidth={200} />
            </div>
            <h6>{user.id}</h6>
          </div>      
        </div>

        <div className='right-container'>
          <h3 style={{marginBottom: '2%'}}>History</h3>
          <div className='flex'>
            <h4>signed up to attester</h4>
            <h4>at epoch #</h4>
            <h4>time</h4>
          </div>
          <div className='scroll'>
            <UserEvent attester={user.attesterId} epoch={user.epoch} time='idk'/>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
})