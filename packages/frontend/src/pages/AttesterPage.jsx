import React, { useContext, useState } from 'react'
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
  const { signups } = useContext(state)
  // signups.loadSignUpsByAttester(id)
  signups.loadSignUpsByAttester('1417799109672561583442883104695026698954826461290')
  const [Selected, setSelected] = useState(0)

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
            <h5>Address</h5>
            <h6 style={{wordBreak: 'break-all'}}>0x{id}</h6>
          </div>
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>
            <InfoCard heading='Epochs Processed' value={'61'} valueIsNum={true}/>
            <InfoCard heading='Total Rep Given' value={'2,109'} valueIsNum={true}/>
            <InfoCard heading='Total Users Signed Up' value={'20'} valueIsNum={true}/>          
            <InfoCard heading='Hashchain Status' value={'Processing'} valueIsNum={false}/>
          </div>
          {Selected === 0 ? (
            <>
              <div style={{display: 'flex'}}>
                <h3 onClick={() => setSelected(0)} className='selected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => setSelected(1)} className='unselected'>Users</h3>
              </div>
              <div className='info-grid'>
                <InfoCard heading='Current Epoch #' value={'62'} valueIsNum={true}/>
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
                <h4>Rep given</h4>
              </div>
              <div className='scroll'>
                <AttestationCard epochKey='123jksif84ntg8fdvnle48sdv/kljewpo8' repGiven='100' />
                <AttestationCard epochKey='dglkdrt[p0o298349309fkjw3q3jwefk2j' repGiven='60' />
                <AttestationCard epochKey='sdkljrw983bnksrg79834rkjnv89qrkje9' repGiven='120' />
                <AttestationCard epochKey='123jksif84ntg8fdvnle48sdv/kljewpo8' repGiven='200' />
                <AttestationCard epochKey='123jksif84ntg8fdvnle48sdv/kljewpo8' repGiven='40' />
                <AttestationCard epochKey='123jksif84ntg8fdvnle48sdv/kljewpo8' repGiven='100' />
                <AttestationCard epochKey='123jksif84ntg8fdvnle48sdv/kljewpo8' repGiven='10' />
                <AttestationCard epochKey='123jksif84ntg8fdvnle48sdv/kljewpo8' repGiven='150' />
                <AttestationCard epochKey='123jksif84ntg8fdvnle48sdv/kljewpo8' repGiven='200' />
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