import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import UnirepInfo from '../components/UnirepInfo'
import Tooltip from '../components/Tooltip'
import InfoCard from '../components/InfoCard'
import UnirepEvent from '../components/UnirepEvent'
import Footer from '../components/Footer'


export default observer(() => {
  const { info, unirep } = useContext(state)
  useEffect(() => {
    const loadData = async () => {
      await unirep.loadAllSignUps();
      await unirep.loadAllAttestations();
      await unirep.loadAllEpochs()
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
          <UnirepInfo info={info} />
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>            
              <InfoCard heading='Total Attesters/Apps' value={unirep.attesterIds.length}/>
              <InfoCard heading='Total Sign Ups' value={unirep.allSignUps.length}/>
              <InfoCard heading='Total Attestations' value={unirep.allAttestations.length}/>              
              <InfoCard heading='Total Reputation Processed' value={unirep.totalPosRep - unirep.totalNegRep}/>
              <InfoCard heading='Latest Attester' value={'Attester Address, Deployed at:'}/>
              <InfoCard heading='Latest Submitted Attestation' value={'By Attester:  at Epoch:  '}/>
          </div>          

          <h3>Stats</h3>
          <div className='graph-container'></div>

          <div className='flex' style={{marginBottom: '2%'}}>
            <h3>Attester Activities</h3>
            <Tooltip text='Some info goes here' maxWidth={200} />
          </div>
          <div className='flex'>
            <h4>Contract</h4>
            <h4>Current</h4>
            <div className='flex'>
              <h4>Users</h4>
              <img src={require('../../public/arrow_up_down.svg')} alt="arrow change order of display"/>
            </div>
            <div className='flex'>
              <h4>Reputation</h4>
              <img src={require('../../public/arrow_up_down.svg')} alt="arrow change order of display"/>
            </div>
            <div className='flex'>
              <h4>next Epoch at</h4>
              <img src={require('../../public/arrow_up_down.svg')} alt="arrow change order of display"/>
            </div>
          </div>
          <div className='scroll'>
            {unirep.currentAttesterStats ? 
              unirep.currentAttesterStats.map((status) => (
                <UnirepEvent key={status.attesterId} status={status} nextEpoch='idk'/>
              )) : null }
            {unirep.currentAttesterStats ? 
              null : 
              'Loading...'
            }
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
})
