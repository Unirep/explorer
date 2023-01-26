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
          <p style={{fontSize: '1.1em'}}>UniRep Terminal is utility for discovering apps built on the protocol & inspecting the anonymous Universal Reputation system being built for all.</p>
          <p style={{fontWeight: '500'}}>Ready to build your own?</p>
          <a style={{color: '#669294'}}href="https://github.com/Unirep/create-unirep-app" target='blank'>Get started here.</a>
          <div className=''><img src={require('../../public/hero_img.svg')} alt="bird image"/></div>
          <UnirepInfo info={info} />
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>            
              <InfoCard heading='Total Attesters/Apps' value1={unirep.attesterIds.length}/>
              <InfoCard heading='Total Sign Ups' value1={unirep.allSignUps.length}/>
              <InfoCard heading='Total Attestations' value1={unirep.allAttestations.length}/>              
              <InfoCard heading='Total Reputation Processed' value1={unirep.totalPosRep - unirep.totalNegRep} value2={unirep.totalPosRep} value3={unirep.totalNegRep}/>
              {/* need to get attester addresses here, currently using Unirep */}
              <div className='info-card'>
                <h4>Latest Attester</h4>
                <div className='flex'>
                  <h5>Deployed at</h5>
                  <h6>mm/dd/yyyy</h6>
                </div>
                <div className='flex'>
                  <h5>Contract address</h5>
                  <h6>
                    <span>{info.UNIREP_ADDRESS.slice(0, 5)}</span>...<span>{info.UNIREP_ADDRESS.slice(-5)} </span>
                    <a href={`https://goerli.arbiscan.io/address/${info.UNIREP_ADDRESS}`} target='blank'>
                      <img src={require('../../public/arrow_up_right.svg')} alt="arrow up right"/>
                    </a>
                  </h6>
                </div>
              </div>
              <div className='info-card'>
                <h4>Last Attestation Submitted</h4>
                <div className='flex'>
                  <h5>By Attester</h5>
                  <h6><span>{info.UNIREP_ADDRESS.slice(0, 5)}</span>...<span>{info.UNIREP_ADDRESS.slice(-5)} </span></h6>
                </div>
                <div className='flex'>
                  <h5>Current Epoch #</h5>
                  <h6>23</h6>
                </div>
              </div>
          </div>          

          <h3>Stats</h3>
          <div className='graph-container'>
            <ul>NEED:
              <li>timestamps of attesters deployed</li>
              <li>timestamps of signups to each attester</li>
            </ul>
          </div>

          <h3>Attester Snapshot</h3>
          <div className='flex events-header'>
            <h4 style={{width: '20%'}}>Contract</h4>
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
