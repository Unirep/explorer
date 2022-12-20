import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import State from '../contexts/state'


export default observer(() => {
  const { info } = useContext(State)
  const { id } = useParams()

  return (
    <div className='container'>
      <h3>Attester {id} </h3>
      <div>Connected to a server with the following info:</div>
      <ul>
        <li>Unirep Address: {info.UNIREP_ADDRESS}</li>
        <li>Provider URL: {info.ETH_PROVIDER_URL}</li>
      </ul>

      <div className='right-container'>
        <h2>Overview</h2>
        <div className='card-container'>
          <div className='info-card'>
            <div className='card-item'>
              <h5>Epochs Processed</h5>
              <h6>icon</h6>
            </div>
            <h2>61</h2>
          </div>

          <div className='info-card'>
            <div className='card-item'>
              <h5>Total Rep Given</h5>
              <h6>icon</h6>
            </div>
            <h2>2,109</h2>
          </div>

          <div className='info-card'>
            <div className='card-item'>
              <h5>Total Users signed up</h5>
              <h6>icon</h6>
            </div>
            <h2>2</h2>
          </div>
        </div>

        <div className='info-card'>
          <div className='card-item'>
            <h5>Hashchain status</h5>
            <h6>Processing</h6>
          </div>
        </div>

      </div>
    </div>
  )
})