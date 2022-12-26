import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import State from '../contexts/state'
import InfoCard from '../components/InfoCard'
import AttestationCard from '../components/events/attesterEvents/AttestationCard'
import UserCard from '../components/events/attesterEvents/UserCard'
import Footer from '../components/layout/footer'


export default observer(() => {
  // const { info } = useContext(State)
  const { id } = useParams()
  const [Selected, setSelected] = useState(0)
  const toggleSelected = (Id: number) => setSelected(Id)

  return (
    <>
      <div className='container'>

        <div className='left-container'>
          <h3>About</h3>
          <div className='image-placeholder'></div>
          <h1>project name</h1>
          <a style={{color: '#669294'}}href="https://github.com/Unirep/create-unirep-app" target='blank'>https://url-of-attester</a>
          <p style={{fontSize: '1.1em'}}>Lorem ipsum dolor sit amet consectetur. Molestie elit sit ut magna vel quis ultricies auctor porttitor. Mauris scelerisque tellus eleifend nunc id purus in. Tempus fames lacus feugiat lectus nibh morbi sapien et.</p>
          <div className='info-card'>
            <div className='flex'>
              <h4>Attester Information</h4>
              <h6>i</h6>
            </div>
            <div className='flex'>
              <h5>ID</h5>
              <h6>2</h6>
            </div>
            <div className='flex'>
              <h5>Deployed at</h5>
              <h6>Jan/20/2023</h6>
            </div>
            <div className='flex'>
              <h5>Address</h5>
              <h6>0xdC9...Bc9</h6>
            </div>
          </div>
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='info-grid'>
            <InfoCard heading='Epochs Processed' tooltip={<div>i</div>} value={'61'} valueIsNum={true}/>
            <InfoCard heading='Total Rep Given' tooltip={<div>i</div>} value={'2,109'} valueIsNum={true}/>
            <InfoCard heading='Total Users Signed Up' tooltip={<div>i</div>} value={'20'} valueIsNum={true}/>          
            <InfoCard heading='Hashchain Status' tooltip={<div>i</div>} value={'Processing'} valueIsNum={false}/>
          </div>
          {Selected === 0 ? (
            <>
              <div style={{display: 'flex'}}>
                <h3 onClick={() => toggleSelected(0)} className='selected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => toggleSelected(1)} className='unselected'>Users</h3>
              </div>
              <div className='info-grid'>
                <InfoCard heading='Current Epoch #' tooltip={<div>i</div>} value={'62'} valueIsNum={true}/>
                <InfoCard heading='Epoch Transition In' tooltip={<div>i</div>} value={'hh:mm:ss'} valueIsNum={true}/>
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
                <h3 onClick={() => toggleSelected(0)} className='unselected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => toggleSelected(1)} className='selected'>Users</h3>
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