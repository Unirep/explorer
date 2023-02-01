import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import ConfigInfoItem from './ConfigInfoItem';
import './infoCard.css'

export default observer(({ info })  => {
    const [contractExpanded, setContractExpanded] = useState(false)
    const [circuitExpanded, setCircuitExpanded] = useState(false)

    return (
        <div className='info-card'>
            <h4 className='card-heading'>Protocol Information</h4>
            <div className='flex'>
              <h5>Current version</h5>
              <h6>{info.VERSION}</h6>
            </div>
            <div className='flex'>
              <h5>Release</h5>
              <h6>{info.RELEASE}</h6>
            </div>
            <div className='flex'>
              <h5>Address</h5>
              <h6>
                <span>{info.UNIREP_ADDRESS.slice(0, 5)}</span>...<span>{info.UNIREP_ADDRESS.slice(-5)} </span>
                <a href={`https://goerli.arbiscan.io/address/${info.UNIREP_ADDRESS}`} target='blank'>
                    <img src={require('../../public/arrow_up_right.svg')} alt="arrow up right"/>
                </a>
              </h6>
              
            </div>
            
            <div className='flex'>
              <h5>Network</h5>
              <h6>{info.ETH_PROVIDER_URL.slice(8, 23).replace('.', '/')}</h6>
            </div>

            {contractExpanded ? (
                <>
                    <div className='flex card-heading'>
                        <h4>Contract Config</h4>
                        <div onClick={() => setContractExpanded(false)} style={{cursor: 'pointer'}}>
                            <img src={require('../../public/arrow_up.svg')} alt="arrow up"/>
                        </div>
                    </div>
                    {/* need these values */}
                    <ConfigInfoItem item='Empty Epoch Tree Root' info={info.EMPTY_EPOCH_TREE_ROOT} />
                    <ConfigInfoItem item='Aggregate Key Count' info={info.AGGREGATE_KEY_COUNT} />
                </>
            ) : (
                <>
                    <div className='flex card-heading'>
                        <h4>Contract Config</h4>
                        <div onClick={() => setContractExpanded(true)} style={{cursor: 'pointer'}}>
                            <img src={require('../../public/arrow_down.svg')} alt="arrow down"/>
                        </div>
                    </div>
                </>
            )}

            {circuitExpanded ? (
                <>
                    <div className='flex card-heading'>
                        <h4>Circuit Config</h4>
                        <div onClick={() => setCircuitExpanded(false)} style={{cursor: 'pointer'}}>
                            <img src={require('../../public/arrow_up.svg')} alt="arrow up"/>
                        </div>
                    </div>
                    <ConfigInfoItem item='State Tree Depth' info={info.STATE_TREE_DEPTH} />
                    <ConfigInfoItem item='Epoch Tree Depth' info={info.EPOCH_TREE_DEPTH} />
                    {/* need this value */}
                    <ConfigInfoItem item='Epoch Tree Arity' info={info.EPOCH_TREE_ARITY} />
                    <ConfigInfoItem item='Epoch Key Nonce Count' info={info.EPOCH_KEY_NONCE_COUNT} />
                </>
            ) : (
                <>
                    <div className='flex card-heading'>
                        <h4>Circuit Config</h4>
                        <div onClick={() => setCircuitExpanded(true)} style={{cursor: 'pointer'}}>
                            <img src={require('../../public/arrow_down.svg')} alt="arrow down"/>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
})