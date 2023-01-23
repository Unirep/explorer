import React from 'react';
import { observer } from 'mobx-react-lite'
import InfoCard from './InfoCard';
import AttestationCard from './AttestationCard';

export default observer(({ currentEpoch, attestations })  => {
    return (
        <>
            <div className='info-grid'>
                <InfoCard heading='Current Epoch #' value={currentEpoch}/>
                <InfoCard heading='Epoch Transition In' value={'hh:mm:ss'}/>
            </div>

            <div className='flex'>
                <h3>Current Epoch Activities</h3>
                <button>Jump to</button>
            </div>

            <div className='graph-container'></div>

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
                {attestations.map(({ epochKey, posRep, negRep, graffiti, _id }) => (
                    <AttestationCard key={_id} epochKey={epochKey} posRep={posRep} negRep={negRep} graffiti={graffiti}/>
                ))}
            </div>
        </>
    )
})
