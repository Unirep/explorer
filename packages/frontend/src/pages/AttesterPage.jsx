import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import InfoCard from '../components/InfoCard'
import AttestationCard from '../components/AttestationCard'
import UserCard from '../components/UserCard'
import Footer from '../components/Footer'


export default observer(() => {
  const { id } = useParams()
  // const id = '1417799109672561583442883104695026698954826461290'
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
            {/* currently showing last epoch, not last processed */}
            <InfoCard heading='Epochs Processed' value={attester.epochsByAttester.length - 1}/>
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
              <div className='info-grid'>
                <InfoCard heading='Current Epoch #' value={attester.epochsByAttester.length}/>
                <InfoCard heading='Epoch Transition In' value={'hh:mm:ss'} valueIsNum={true}/>
              </div>

              <div className='flex'>
                <h3>Current Epoch Activities</h3>
                <button>Jump to</button>
              </div>
              <div className='graph-container'></div>
              {/* <div className='flex'>
                <h5>Epoch start</h5>
                <h5>Epoch end</h5>
              </div> */}

              <div className='flex'>
                <h3>Epoch Keys</h3>
                <button>Jump to</button>
              </div>
              <div className='flex'>
                <h4>Epoch key</h4>
                <div className='flex'>
                  <h4>Positive Rep</h4>
                  <img src={require('../../public/arrow_up_down.svg')} alt="arrow change order of display"/>
                </div>
                <div className='flex'>
                  <h4>Negative Rep</h4>
                  <img src={require('../../public/arrow_up_down.svg')} alt="arrow change order of display"/>
                </div>
                <div className='flex'>
                  <h4>Graffiti</h4>
                  <img src={require('../../public/arrow_up_down.svg')} alt="arrow change order of display"/>
                </div>
                
              </div>
              <div className='scroll'>
                {attester.attestationsByAttester ?
                  attester.attestationsByAttester.map(({ epochKey, posRep, negRep, graffiti, _id }) => (
                    <AttestationCard key={_id} epochKey={epochKey} posRep={posRep} negRep={negRep} graffiti={graffiti}/>
                  )) : null }
              </div>
            </>
          ) : (
            <>
              <div style={{display: 'flex', marginBottom: '2%'}}>
                <h3 onClick={() => setSelected(0)} className='unselected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => setSelected(1)} className='selected'>Users</h3>
              </div>
                <div className='flex'>
                <h4>Semaphore ID</h4>
                <h4>Signed up</h4>
                <h4># of epochs</h4>
                <h4>Last seen</h4>
                <h4>Total Rep</h4>
              </div>
              <div className='scroll'>
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
                <UserCard id='e34..djljdg' signUp='1' epochsMade='10' lastSeen='3' totalRep='591' />
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
})