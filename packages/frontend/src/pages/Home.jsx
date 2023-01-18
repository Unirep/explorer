import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import InfoCard from '../components/InfoCard'
import UnirepEvent from '../components/UnirepEvent'
import Footer from '../components/Footer'


export default observer(() => {
  const { info, unirep } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      await unirep.loadAllSignUps();
      await unirep.loadAllAttestations()
    }
    loadData();
  }, [])
  
  return (
    <>
      <div className='container'>
        
        <div className='left-container'>
          <h1>Terminal</h1>
          <p style={{fontSize: '1.1em'}}>UniRep Terminal is utility site that help others to discover apps built on the protocol & inspect the Rep system we are building for all.</p>
          <p style={{fontWeight: '500'}}>Ready to build your own?</p>
          <a style={{color: '#669294'}}href="https://github.com/Unirep/create-unirep-app" target='blank'>Get started here.</a>
          <div className=''><img src={require('../../public/hero_img.svg')} alt="bird image"/></div>
          <div className='info-card'>
            <div className='flex'>
              <h4>Protocol Information</h4>
              <Tooltip text='Some info goes here' maxWidth={200} />
            </div>
            <div className='flex'>
              <h5>Current version</h5>
              <h6>{info.VERSION}</h6>
            </div>
            <div className='flex'>
              <h5>Release</h5>
              <h6>{info.RELEASE}</h6>
            </div>
            <div className='flex'>
              <h5>Address</h5>
              <h6 style={{wordBreak: 'break-all'}}>{info.UNIREP_ADDRESS}</h6>
            </div>
            <div className='flex'>
              <h5>Network</h5>
              <h6 style={{wordBreak: 'break-all'}}>{info.ETH_PROVIDER_URL}</h6>
            </div>
          </div>
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>            
              {/* <InfoCard heading='Total Attesters/Apps' value='21' valueIsNum={true}/>
              <InfoCard heading='Total Sign Ups' value={unirep.allSignups.length} valueIsNum={true}/>
              <InfoCard heading='Total Attestations' value={unirep.allAttestations.length} valueIsNum={true}/>              
              <InfoCard heading='Total Reputation Processed' value={unirep.totalRep} valueIsNum={true}/> */}
              <InfoCard heading='Latest Attester' value={'Attester Address, Deployed at:'} valueIsNum={false}/>
              <InfoCard heading='Latest Submitted Attestation' value={'By Attester:  at Epoch:  '} valueIsNum={false}/>
          </div>          

          <h3>Stats</h3>
          <div className='graph-container'>
            <ul>
              <li>SIGNUPS:</li>
              {/* <li>{unirep.allSignUps.length}</li> */}
              {/* <li>{signups.allSignUps[0].commitment}</li>
              <li>{signups.allSignUps[0].epoch}</li>
              <li>{signups.allSignUps[0].attesterId}</li>
              <li>{signups.allSignUps[0]._id}</li> */}
            </ul>
          </div>

          <div className='flex' style={{marginBottom: '2%'}}>
            <h3>Attester Activities</h3>
            <Tooltip text='Some info goes here' maxWidth={200} />
          </div>
          <div className='flex'>
            <h4>Contract</h4>
            <h4>Current</h4>
            <h4>Users</h4>
            <h4>Reputation</h4>
            <h4>next Epoch at</h4>
          </div>
          <div className='scroll'>
            <UnirepEvent address='23dfs49weo4kw034w4derg55' current='1' users='30' reputation='50' nextEpoch='Jan30, 14:00 UTC'/>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
})
