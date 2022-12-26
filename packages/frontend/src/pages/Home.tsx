import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import InfoCard from '../components/InfoCard'
import UnirepEvent from '../components/events/unirepEvents'
import Footer from '../components/layout/footer'


export default observer(() => {
  // const { info }: string = useContext(state)
  return (
    <>
      <div className='container'>
        
        <div className='left-container'>
          <h1>Terminal</h1>
          <p style={{fontSize: '1.1em'}}>UniRep Terminal is utility site that help others to discover apps built on the protocol & inspect the Rep system we are building for all.</p>
          <p>Interested to build your own?</p>
          <a style={{color: '#669294'}}href="https://github.com/Unirep/create-unirep-app" target='blank'>Get started here.</a>
          <div className=''><img src={require('../../public/hero_img.svg')} alt="bird image"/></div>
          <div className='info-card' style={{width: '100%'}}>
            <div className='flex'>
              <h4>Protocol Information</h4>
              <h6>i</h6>
            </div>
            <div className='flex'>
              <h5>Current version</h5>
              <h6>v2</h6>
            </div>
            <div className='flex'>
              <h5>Release</h5>
              <h6>Jan/20/2023</h6>
            </div>
            <div className='flex'>
              <h5>Address</h5>
              <h6>0xdC9...Bc9</h6>
            </div>
            <div className='flex'>
              <h5>Network</h5>
              <h6>Arbitrum/Goerli</h6>
            </div>
          </div>
        </div>

        <div className='right-container'>
          <h3>Overview</h3>
          <div className='card-container'>
            <InfoCard heading='Total Attesters' tooltip={<div>i</div>} value={'21'} valueIsNum={true}/>
            <InfoCard heading='Total Users' tooltip={<div>i</div>} value={'3,290,124'} valueIsNum={true}/>
          </div>
          <div className='card-container'>
            <InfoCard heading='Total Rep Given' tooltip={<div>i</div>} value={'5,324,678'} valueIsNum={true}/>
            <InfoCard heading='Hashchains Completed' tooltip={<div>i</div>} value={'292'} valueIsNum={true}/>
          </div>
          <div className='card-container'>
            <InfoCard heading='Latest Attester' tooltip={<div>i</div>} value={'App Name Here'} valueIsNum={false}/>
            <InfoCard heading='Latest Submitted Attestation' tooltip={<div>i</div>} value={'Attester Address'} valueIsNum={false}/>
          </div>

          <h3>Stats</h3>
          <div className='graph-container'>
            <div>Connected to a server with the following info:</div>
              <ul>
                {/* <li>Unirep Address: {info.UNIREP_ADDRESS}</li> */}
                {/* <li>Provider URL: {info.ETH_PROVIDER_URL}</li> */}
              </ul>
          </div>

          <div className='flex'>
            <h3>Attester Activities</h3>
            <h6>i</h6>
          </div>
          <div className='flex'>
            <h4>Contract Add</h4>
            <h4>Attester</h4>
            <h4>Epoch</h4>
            <h4>User</h4>
            <h4>Rep Given</h4>
          </div>
          <UnirepEvent address='0x..123' appName='Attester Abc' epoch='5' user='21' repGiven='120'/>
          <UnirepEvent address='0x..456' appName='Attester Def' epoch='5' user='22' repGiven='240'/>
          <UnirepEvent address='0x..789' appName='Attester Ghi' epoch='5' user='23' repGiven='100'/>
          <UnirepEvent address='0x..012' appName='Attester Jkl' epoch='5' user='24' repGiven='30'/>
          <UnirepEvent address='0x..345' appName='Attester Mno' epoch='5' user='25' repGiven='150'/>
          <UnirepEvent address='0x..678' appName='Attester Pqr' epoch='5' user='26' repGiven='210'/>
        </div>
      </div>

      <Footer />
    </>
  )
})
