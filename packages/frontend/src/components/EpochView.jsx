import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite'
import state from '../contexts/state';
import InfoCard from './InfoCard';
import AttestationCard from './AttestationCard';
import './epochView.css'

export default observer(({ currentEpoch, attestations })  => {    
    const { attester } = useContext(state)
    const [selectedEpochActivities, setSelectedEpochActivities] = useState(currentEpoch)
    const [selectedEpochAttestations, setSelectedEpochAttestations] = useState(currentEpoch)
    console.log(currentEpoch)
    console.log(selectedEpochActivities)
    console.log(attester.signUpsByEpoch)
    console.log(attester.attestationsByEpoch)
    console.log(attester.attestationsByEpoch[4])

    return (
        <>
            <div className='info-grid'>
                <InfoCard heading='Current Epoch #' value={currentEpoch}/>
                <InfoCard heading='Epoch Transition In' value={'hh:mm:ss'}/>
            </div>

            <div className='flex'>
                <h3>Activities (Epoch {selectedEpochActivities})</h3>
                <div className="dropdown">
                    <button className="dropbtn">Jump to epoch..</button>
                    <div className="dropdown-content">
                        {attester.epochsByAttester.map(({ number }) => (
                            <p onClick={() => setSelectedEpochActivities(number)} key={number} >{number}</p>
                        ))}
                    </div>
                </div>               
            </div>

            <div className='graph-container'>
                <ul>signups this epoch:
                    <li></li>
                </ul>
                <ul>attestations this epoch:
                    <li></li>
                </ul>
                <ul>UST this epoch:
                    <li></li>
                </ul>
            </div>

            <div className='flex'>
                <h3>Attestations (Epoch {selectedEpochAttestations})</h3>
                <div className="dropdown">
                    <button className="dropbtn">Jump to epoch..</button>
                    <div className="dropdown-content">
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
                {/* {attestations.map(({ epochKey, posRep, negRep, graffiti, _id }) => (
                    <AttestationCard key={_id} epochKey={epochKey} posRep={posRep} negRep={negRep} graffiti={graffiti}/>
                ))} */}
                {attester.attestationsByEpoch[selectedEpochAttestations] ?
                    attestationsByEpoch[selectedEpochAttestations].map(({ epochKey, posRep, negRep, graffiti, _id }) => (
                        <AttestationCard key={_id} epochKey={epochKey} posRep={posRep} negRep={negRep} graffiti={graffiti}/>
                )) : null}
                {attester.attestationsByEpoch[selectedEpochAttestations] ? 
                null : 
                'Loading...'
                }
            </div>
        </>
    )
})
