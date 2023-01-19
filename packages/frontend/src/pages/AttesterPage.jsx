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
  const [Selected, setSelected] = useState(0)
  useEffect(() => {
    const loadData = async () => {
      await attester.loadSignUpsByAttester(id);
      await attester.loadAttestationsByAttester(id);
      await attester.loadEpochsByAttester(id)
    }
    loadData();
  }, [])
  const currentEpoch = attester.epochsByAttester.length

  return (
    <>
      <div className='container'>

        <div className='left-container'>
          <h3>Attester</h3>
          <div className='info-card'>
            <div className='flex'>
              <h4>Attester Information</h4>
              <Tooltip text='Some info goes here' maxWidth={200} />
            </div>
            <div className='flex'>
              <h5>Deployed at</h5>
              <h6>Jan/20/2023</h6>
            </div>
            <div className='flex'>
              <h5>Contract Address</h5>
              <h6>0x
                <span>{id.slice(0, 3)}</span>...<span>{id.slice(-6, -1)}  </span>
                <img src={require('../../public/arrow_up_right.svg')} alt="arrow up right"/>
              </h6>
            </div>
            
          </div>
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>
            {/* currently showing previous epoch, not last processed */}
            <InfoCard heading='Epochs Processed' value={currentEpoch - 1}/>
            <InfoCard heading='Total Rep Given' value={attester.posRep + attester.negRep}/>
            <InfoCard heading='Total Users Signed Up' value={attester.signUpsByAttester.length}/>          
            <InfoCard heading='Hashchain Status' value={'Processing'}/>
          </div>
          {Selected === 0 ? (
            <>
              <div style={{display: 'flex'}}>
                <h3 onClick={() => setSelected(0)} className='selected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => setSelected(1)} className='unselected'>Users</h3>
              </div>  
              {attester.attestationsByAttester ?
                <EpochView currentEpoch={currentEpoch} attestations={attester.attestationsByAttester}/> :
                null
              }
              {attester.attestationsByAttester ? 
                null : 
                'Loading...'
              }
            </>
          ) : (
            <>
              <div style={{display: 'flex', marginBottom: '2%'}}>
                <h3 onClick={() => setSelected(0)} className='unselected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => setSelected(1)} className='selected'>Users</h3>
              </div>
              {attester.signUpsByAttester ?
                <UserView signups={attester.signUpsByAttester}/> :
                null
              }
              {attester.signUpsByAttester ? 
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