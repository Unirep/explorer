import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../contexts/state'
import Tooltip from '../components/Tooltip'
import InfoCard from '../components/InfoCard'
import UnirepEvent from '../components/UnirepEvent'
import Footer from '../components/Footer'


export default observer(() => {
  const { info } = useContext(state)
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
          <div className='info-grid'>            
              <InfoCard heading='Total Attesters' value={'21'} valueIsNum={true}/>
              <InfoCard heading='Total Users' value={'3,290,124'} valueIsNum={true}/>
              <InfoCard heading='Total Rep Given' value={'5,324,678'} valueIsNum={true}/>
              <InfoCard heading='Hashchains Completed' value={'292'} valueIsNum={true}/>
              <InfoCard heading='Latest Attester' value={'App Name Here'} valueIsNum={false}/>
              <InfoCard heading='Latest Submitted Attestation' value={'Attester Address'} valueIsNum={false}/>
          </div>          

          <h3>Stats</h3>
          <div className='graph-container'>
            <div>Connected to a server with the following info:</div>
              <ul>
                <li>Unirep Address: {info.UNIREP_ADDRESS}</li>
                <li>Provider URL: {info.ETH_PROVIDER_URL}</li>
              </ul>
          </div>

          <div className='flex' style={{marginBottom: '2%'}}>
            <h3>Attester Activities</h3>
            <Tooltip text='Some info goes here' maxWidth={200} />
          </div>
          <div className='flex'>
            <h4>Contract Add</h4>
            <h4>Attester</h4>
            <h4>Epoch</h4>
            <h4>User</h4>
            <h4>Rep Given</h4>
          </div>
          <div className='scroll'>
            <UnirepEvent address='0x..123' appName='Attester Abc' epoch='5' user='21' repGiven='120'/>
            <UnirepEvent address='0x..456' appName='Attester Def' epoch='5' user='22' repGiven='240'/>
            <UnirepEvent address='0x..789' appName='Attester Ghi' epoch='5' user='23' repGiven='100'/>
            <UnirepEvent address='0x..012' appName='Attester Jkl' epoch='5' user='24' repGiven='300'/>
            <UnirepEvent address='0x..345' appName='Attester Mno' epoch='5' user='25' repGiven='150'/>
            <UnirepEvent address='0x..678' appName='Attester Pqr' epoch='5' user='26' repGiven='210'/>
            <UnirepEvent address='0x..123' appName='Attester Abc' epoch='5' user='21' repGiven='120'/>
            <UnirepEvent address='0x..456' appName='Attester Def' epoch='5' user='22' repGiven='240'/>
            <UnirepEvent address='0x..789' appName='Attester Ghi' epoch='5' user='23' repGiven='100'/>
            <UnirepEvent address='0x..012' appName='Attester Jkl' epoch='5' user='24' repGiven='300'/>
            <UnirepEvent address='0x..345' appName='Attester Mno' epoch='5' user='25' repGiven='150'/>
            <UnirepEvent address='0x..678' appName='Attester Pqr' epoch='5' user='26' repGiven='210'/>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
})
