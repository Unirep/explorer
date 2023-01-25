import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Tooltip from './Tooltip';
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
              <a><img src={require('../../public/arrow_up_right.svg')} alt="arrow up right"/></a>
            </div>
            <h6 style={{wordBreak: 'break-all'}}>{info.UNIREP_ADDRESS}</h6>
            <div className='flex'>
              <h5>Network</h5>
              <h6 style={{wordBreak: 'break-all'}}>{info.ETH_PROVIDER_URL}</h6>
            </div>

            {contractExpanded ? (
                <>
                    <div className='flex card-heading'>
                        <h4>Contract Config</h4>
                        <div onClick={() => setContractExpanded(false)} style={{cursor: 'pointer'}}>
                            <img src={require('../../public/arrow_up.svg')} alt="arrow up"/>
                        </div>
                    </div>
                    <div className='flex'>
                        <h5>Empty Epoch Tree Root</h5>
                        <Tooltip text='Some info goes here' maxWidth={200} />
                    </div>
                    <h6 style={{wordBreak: 'break-all'}}>{info.EMPTY_EPOCH_TREE_ROOT}</h6>
                    <div className='flex'>
                        <h5>Aggregate Key Count</h5>
                        <Tooltip text='Some info goes here' maxWidth={200} />
                    </div>
                    <h6 style={{wordBreak: 'break-all'}}>{info.AGGREGATE_KEY_COUNT}</h6>
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
                    <div className='flex'>
                        <h5>State Tree Depth</h5>
                        <Tooltip text='Some info goes here' maxWidth={200} />
                    </div>
                    <h6 style={{wordBreak: 'break-all'}}>{info.STATE_TREE_DEPTH}</h6>
                    <div className='flex'>
                        <h5>Epoch Tree Depth</h5>
                        <Tooltip text='Some info goes here' maxWidth={200} />
                    </div>
                    <h6 style={{wordBreak: 'break-all'}}>{info.EPOCH_TREE_DEPTH}</h6>
                    <div className='flex'>
                        <h5>Epoch Tree Arity</h5>
                        <Tooltip text='Some info goes here' maxWidth={200} />
                    </div>
                    <h6 style={{wordBreak: 'break-all'}}>{info.EPOCH_TREE_ARITY}</h6>
                    <div className='flex'>
                        <h5>Epoch Key Nonce Count</h5>
                        <Tooltip text='Some info goes here' maxWidth={200} />
                    </div>
                    <h6 style={{wordBreak: 'break-all'}}>{info.EPOCH_KEY_NONCE_COUNT}</h6>
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