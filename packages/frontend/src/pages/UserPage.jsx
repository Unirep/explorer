import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import UserEvent from '../components/UserEvent'
import Footer from '../components/Footer'

export default observer(() => { 
  // const { id } = useParams()
  const { user } = useContext(state)
  console.log('from UserPage...', user.signUps)
  console.log('from UserPage...', user.signUps[0])
  console.log('from UserPage...', user.signUps.length)
  // console.log('from UserPage...', user.signUps[0].attesterId)
  // can log signUps[0], but signUps[0].anything is undefined

  return (
    <>
      <div className='container'>

        <div className='left-container'>
          <h3>User</h3>
          <div className='info-card'>
            <h4>User Information</h4>
            <div className='flex'>
              <h5>Onboard to UniRep</h5>
              <h6>210 days ago</h6>
            </div>
            <div className='flex'>
              <h5>Attesters Joined</h5>
              <h6>{user.signUps.length}</h6>
            </div>
            <div className='flex'>
              <h5>Semaphore ID</h5>
              <Tooltip text='Some info goes here' maxWidth={200} />
            </div>
            <h6 style={{wordBreak: 'break-all'}}>{user.commitment}</h6>
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
            {/* <UserEvent attester={user.signUps[0].attesterId} epoch={user.signUps[0].epoch} time='idk'/> */}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
})