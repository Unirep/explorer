import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import State from '../contexts/state'


export default observer(() => {
  const { info } = useContext(State)
  return (
    <div className='container'>
      
      <div className='left-container'>
        <h1>Terminal</h1>
        <p>UniRep Terminal is utility site that help others to discover apps built on the protocol & inspect the Rep system we are building for all.</p>
        <p>Interested to build your own?</p>
        <a>Get started here.</a>
        <img src={require('../../public/hero_img.svg')} alt="bird image"/>
        <div className='info-card' style={{width: '100%'}}>
          <div className='card-item'>
            <h3>Protocol Information</h3>
            <h6>icon</h6>
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
            <h5>Contract address</h5>
            <h6>0xdC9...Bc9</h6>
          </div>
          <div className='card-item'>
            <h5>Network</h5>
            <h6>Arbitrum/Goerli</h6>
          </div>
        </div>
      </div>

      <div className='right-container'>
        <h2>Overview</h2>
        <div className='card-container'>
          <div className='info-card'>
            <div className='card-item'>
              <h5>Total attesters/apps</h5>
              <h6>icon</h6>
            </div>
            <h2>21</h2>
          </div>

          <div className='info-card'>
            <div className='card-item'>
              <h5>Total Users</h5>
              <h6>icon</h6>
            </div>
            <h2>3,290,124</h2>
          </div>
        </div>

        <div className='card-container'>
          <div className='info-card'>
            <div className='card-item'>
              <h5>Total Rep Given</h5>
              <h6>icon</h6>
            </div>
            <h2>3,290,124</h2>
          </div>

          <div className='info-card'>
            <div className='card-item'>
              <h5>Hashchains Completed</h5>
              <h6>icon</h6>
            </div>
            <h2>292</h2>
          </div>
        </div>

        <div className='card-container'>
          <div className='info-card'>
            <div className='card-item'>
              <h5>Latest Attester</h5>
              <h6>icon</h6>
            </div>
            <h6>App Name</h6>
          </div>

          <div className='info-card'>
            <div className='card-item'>
              <h5>Last Attestation Submitted</h5>
              <h6>icon</h6>
            </div>
            <h6>Attester Address</h6>
          </div>
        </div>

        <h2>Stats</h2>


        <div>Connected to a server with the following info:</div>
        <ul>
          <li>Unirep Address: {info.UNIREP_ADDRESS}</li>
          <li>Provider URL: {info.ETH_PROVIDER_URL}</li>
        </ul>
      </div>
      
    </div>
  )
})
