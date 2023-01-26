import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import InfoCard from '../components/InfoCard'
import EpochView from '../components/EpochView'
import UserView from '../components/UserView'
import Footer from '../components/Footer'

export default observer(() => {
  const { id } = useParams()
  const { attester } = useContext(state)
  const [selectedView, setSelectedView] = useState('Epoch')
  useEffect(() => {
    const loadData = async () => {
      await attester.loadEpochsByAttester(id);
      await attester.loadSignUpsByAttester(id);
      await attester.loadAttestationsByAttester(id);
      await attester.loadUSTByAttester(id)
    }
    loadData();
  }, [])
  const currentEpoch = attester.epochsByAttester.length - 1

  return (
    <>
      <div className='container'>

        <div className='left-container'>
          <h3>Attester</h3>
          <div className='info-card'>
            <h4>Attester Information</h4>
            <div className='flex'>
              <h5>Deployed at</h5>
              <h6>Jan/20/2023</h6>
            </div>
            <div className='flex'>
              <h5>Contract Address</h5>
              <h6>0x
                <span>{id.slice(0, 3)}</span>...<span>{id.slice(-5)}  </span>
                <a href={`https://goerli.arbiscan.io/address/0x${id}`} target='blank'>
                <img src={require('../../public/arrow_up_right.svg')} alt="arrow up right"/>
                </a>
              </h6>
            </div>           
          </div>
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>
            {/* currently showing previous epoch, not last processed */}
            <InfoCard heading='Epochs Processed' value1={currentEpoch - 1}/>
            <InfoCard heading='Total Rep Given' value1={attester.totalPosRep - attester.totalNegRep} value2={attester.totalPosRep} value3={attester.totalNegRep}/>
            <InfoCard heading='Total Users Signed Up' value1={attester.signUpsByAttester.length}/>          
            <div className='info-card'>
              <div className='flex'>
                <h4>Hashchain Status</h4>
                <Tooltip />
              </div>             
              <div className='flex'>
                <h5>Average Delay</h5>                 
                <h6>2 min</h6>
              </div>
              <div className='flex'>
                <h5>Status</h5>
                <h6>Completed <span class="dot"></span></h6>
              </div>
            </div>
          </div>
          {selectedView === 'Epoch' ? (
            <>
              <div style={{display: 'flex'}}>
                <h3 onClick={() => setSelectedView('Epoch')} className='selected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => setSelectedView('User')} className='unselected'>Users</h3>
              </div>  
              {attester.epochsByAttester.length > 0 && attester.attestationsByAttester.length > 0 && attester.ustByAttester.length > 0 ?
                <EpochView currentEpoch={currentEpoch}/> :
                null
              }
              {attester.epochsByAttester.length > 0 && attester.attestationsByAttester.length > 0 && attester.ustByAttester.length > 0 ? 
                null : 
                'Loading...'
              }
            </>
          ) : (
            <>
              <div style={{display: 'flex', marginBottom: '2%'}}>
                <h3 onClick={() => setSelectedView('Epoch')} className='unselected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => setSelectedView('User')} className='selected'>Users</h3>
              </div>
              {attester.signUpsByAttester.length > 0 ?
                <UserView signups={attester.signUpsByAttester}/> :
                null
              }
              {attester.signUpsByAttester.length > 0 ? 
                null : 
                'Loading...'
              }
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
})