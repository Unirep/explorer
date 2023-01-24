import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite'
import state from '../contexts/state';
import InfoCard from './InfoCard';
import AttestationCard from './AttestationCard';
import './epochView.css'

export default observer(({ currentEpoch, attestations, attByEp, suByEp })  => {
    const { attester } = useContext(state)
    const [selectedEpochActivities, setSelectedEpochActivities] = useState(currentEpoch)
    const [selectedEpochAttestations, setSelectedEpochAttestations] = useState(currentEpoch)
    return (
        <>
            <div className='info-grid'>
                <InfoCard heading='Current Epoch #' value={currentEpoch}/>
                <InfoCard heading='Epoch Transition In' value={'hh:mm:ss'}/>
            </div>

            <div className='flex'>
                <h3>Activities (Epoch {selectedEpochActivities})</h3>
                <div class="dropdown">
                    <button class="dropbtn">Jump to epoch..</button>
                    <div class="dropdown-content">
                        {attester.epochsByAttester.map(({ number }) => (
                            <p onClick={() => setSelectedEpochActivities(number)} key={number} >{number}</p>
                        ))}
                    </div>
                </div>               
            </div>

            <div className='graph-container'>
                <ul>
                    <li>signups this epoch: {suByEp.size}</li>
                </ul>
            </div>

            <div className='flex'>
                <h3>Attestations (Epoch {selectedEpochAttestations})</h3>
                <div class="dropdown">
                    <button class="dropbtn">Jump to epoch..</button>
                    <div class="dropdown-content">
                        {attester.epochsByAttester.map(({ number }) => (
                            <p onClick={() => setSelectedEpochAttestations(number)} key={number} >{number}</p>
                        ))}
                    </div>
                </div>
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
