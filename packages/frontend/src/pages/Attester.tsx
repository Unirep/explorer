import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import State from '../contexts/state'
import InfoCard from '../components/InfoCard'
import EventCard from '../components/EventCard'
import Footer from '../components/Footer'


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
          <p style={{fontSize: '1.1em'}}>Lorem ipsum dolor sit amet consectetur. Molestie elit sit ut magna vel quis ultricies auctor porttitor. Mauris scelerisque tellus eleifend nunc id purus in. Tempus fames lacus feugiat lectus nibh morbi sapien et.</p>
          <a style={{color: '#669294'}}href="https://github.com/Unirep/create-unirep-app" target='blank'>https://url-of-attester</a>
          <div className='info-card' style={{width: '100%'}}>
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
          <div className='card-container'>
            <InfoCard heading='Epochs Processed' tooltip={<div>i</div>} value={'61'} valueIsNum={true}/>
            <InfoCard heading='Total Rep Given' tooltip={<div>i</div>} value={'2,109'} valueIsNum={true}/>
            <InfoCard heading='Total Users Signed Up' tooltip={<div>i</div>} value={'20'} valueIsNum={true}/>
          </div> 
          <InfoCard heading='Hashchain Status' tooltip={<div>i</div>} value={'Processing'} valueIsNum={false}/>

          {Selected === 0 ? (
            <div>
              <div style={{display: 'flex'}}>
                <h3 onClick={() => toggleSelected(0)} className='selected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => toggleSelected(1)} className='unselected'>Users</h3>
              </div>
              <InfoCard heading='Current Epoch #' tooltip={<div>i</div>} value={'62'} valueIsNum={true}/>
              <InfoCard heading='Epoch Transition In' tooltip={<div>i</div>} value={'hh:mm:ss'} valueIsNum={true}/>

              <div className='flex'>
                <h3>Current Epoch Activities</h3>
                <button>Jump to</button>
              </div>
              <div className='graph-container'></div>
              <div className='flex'>
                <h5>Epoch start</h5>
                <h5>Epoch end</h5>
              </div>

              <div className='flex'>
                <h3>Epoch Keys</h3>
                <button>Jump to</button>
              </div>
              <div className='flex'>
                <h4>Epoch key</h4>
                <h4>Rep received</h4>
              </div>
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
            </div>
          ) : (
            <div>
              <div style={{display: 'flex'}}>
                <h3 onClick={() => toggleSelected(0)} className='unselected' style={{marginRight: "30px"}}>Epoch</h3>
                <h3 onClick={() => toggleSelected(1)} className='selected'>Users</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
})