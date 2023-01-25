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
              <a href='https://goerli.arbiscan.io/address/0x5e50ba700443FfA87d3A02039234dAA4F3c59A36' target='blank'>
                <img src={require('../../public/arrow_up_right.svg')} alt="arrow up right"/>
              </a>
            </div>
            <h6 className='break'>{info.UNIREP_ADDRESS}</h6>
            <div className='flex'>
              <h5>Network</h5>
              <h6 className='break'>{info.ETH_PROVIDER_URL}</h6>
            </div>

            {contractExpanded ? (
                <>
                    <div className='flex card-heading'>
                        <h4>Contract Config</h4>
                        <div onClick={() => setContractExpanded(false)} style={{cursor: 'pointer'}}>
                            <img src={require('../../public/arrow_up.svg')} alt="arrow up"/>
                        </div>
                    </div>
                    <ConfigInfoItem info={info.EMPTY_EPOCH_TREE_ROOT} />
                    <ConfigInfoItem info={info.AGGREGATE_KEY_COUNT} />
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
                    <ConfigInfoItem info={info.STATE_TREE_DEPTH} />
                    <ConfigInfoItem info={info.EPOCH_TREE_DEPTH} />
                    <ConfigInfoItem info={info.EPOCH_TREE_ARITY} />
                    <ConfigInfoItem info={info.EPOCH_KEY_NONCE_COUNT} />
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