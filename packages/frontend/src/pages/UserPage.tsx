import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import State from '../contexts/state'
import InfoCard from '../components/InfoCard'
import UserEvent from '../components/events/userEvents'
import Footer from '../components/layout/footer'


export default observer(() => {
  // const { info } = useContext(State)
  const { id } = useParams()

  return (
    <>
      <div className='container'>

        <div className='left-container'>
          <h3>About</h3>
          <div className='image-placeholder'></div>
          <h3>User {id}</h3>
          <div>Connected to a server with the following info:</div>
          <ul>
            {/* <li>Unirep Address: {info.UNIREP_ADDRESS}</li> */}
            {/* <li>Provider URL: {info.ETH_PROVIDER_URL}</li> */}
          </ul>
          <div className='info-card'>
            <div className='flex'>
              <h4>User Information</h4>
              <h6>i</h6>
            </div>
            <div className='flex'>
              <h5>Onboard to UniRep</h5>
              <h6>210 days ago</h6>
            </div>
          </div>      
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>
            <InfoCard heading='Total Rep' tooltip={<div>i</div>} value={'591'} valueIsNum={true}/>
            <InfoCard heading='Attesters joined' tooltip={<div>i</div>} value={'2'} valueIsNum={true}/>
          </div>

          <h3 style={{marginBottom: '2%'}}>User History</h3>
          <div className='flex'>
            <h4>Rep received</h4>
            <h4>from attester</h4>
            <h4>epoch #</h4>
          </div>
          <div className='scroll'>
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
            <UserEvent repReceived='122' attester='0x..123' epoch='3' />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
})