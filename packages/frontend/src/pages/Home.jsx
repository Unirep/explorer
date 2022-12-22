import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import EventCard from '../components/EventCard'
import Footer from '../components/Footer'


export default observer(() => {
  const { info } = useContext(state)
  return (
    <>
      <div className='container'>
        
        <div className='left-container'>
          <h1>Terminal</h1>
          <p style={{fontSize: '1.1em'}}>UniRep Terminal is utility site that help others to discover apps built on the protocol & inspect the Rep system we are building for all.</p>
          <p>Interested to build your own?</p>
          <a style={{color: '#669294'}}href="https://github.com/Unirep/create-unirep-app" target='blank'>Get started here.</a>
          <div className=''><img src={require('../../public/hero_img.svg')} alt="bird image"/></div>
          <div className='info-card' style={{width: '100%'}}>
            <div className='card-item'>
              <h4>Protocol Information</h4>
              <h6>i</h6>
            </div>
            <div className='card-item'>
              <h5>Current version</h5>
              <h6>v2</h6>
            </div>
            <div className='card-item'>
              <h5>Release</h5>
              <h6>Jan/20/2023</h6>
            </div>
            <div className='card-item'>
              <h5>Address</h5>
              <h6>0xdC9...Bc9</h6>
            </div>
            <div className='card-item'>
              <h5>Network</h5>
              <h6>Arbitrum/Goerli</h6>
            </div>
          </div>
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='card-container'>
            <div className='info-card'>
              <div className='card-item'>
                <h4>Total attesters/apps</h4>
                <h6>i</h6>
              </div>
              <h2>21</h2>
            </div>

            <div className='info-card'>
              <div className='card-item'>
                <h4>Total Users</h4>
                <h6>i</h6>
              </div>
              <h2>3,290,124</h2>
            </div>
          </div>

          <div className='card-container'>
            <div className='info-card'>
              <div className='card-item'>
                <h4>Total Rep Given</h4>
                <h6>i</h6>
              </div>
              <h2>3,290,124</h2>
            </div>

            <div className='info-card'>
              <div className='card-item'>
                <h4>Hashchains Completed</h4>
                <h6>i</h6>
              </div>
              <h2>292</h2>
            </div>
          </div>

          <div className='card-container'>
            <div className='info-card'>
              <div className='card-item'>
                <h4>Latest Attester</h4>
                <h6>i</h6>
              </div>
              <h6>App Name</h6>
            </div>

            <div className='info-card'>
              <div className='card-item'>
                <h4>Last Attestation Submitted</h4>
                <h6>i</h6>
              </div>
              <h6>Attester Address</h6>
            </div>
          </div>

          <h3>Stats</h3>
          <div className='graph-container'>
            <div>Connected to a server with the following info:</div>
              <ul>
                <li>Unirep Address: {info.UNIREP_ADDRESS}</li>
                <li>Provider URL: {info.ETH_PROVIDER_URL}</li>
              </ul>
          </div>

          <div className='flex'>
            <h3>Attester Activities</h3>
            <h6>i</h6>
          </div>
          <div className='flex'>
            <h4>Contract Add</h4>
            <h4>Attester</h4>
            <h4>Epoch</h4>
            <h4>User</h4>
            <h4>Rep Given</h4>
          </div>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />

        </div>

      </div>

      <div>
        <Footer />
      </div>
    </>
  )
})
