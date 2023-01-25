import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import './eventCard.css'

export default observer(({ status, nextEpoch })  => {
    return (
        <div className="event-card">
            <Link to={`attester/${status.attesterId}`}>
                <p>0x<span>{status.attesterId.slice(0, 3)}</span>...<span>{status.attesterId.slice(-5)}</span></p>
            </Link>
            <p>Epoch #{status.currentEpoch}</p>
            <p>{status.numUsers}</p>
            <p>{status.posReputation - status.negReputation}
                <span style={{fontSize: '12px', fontWeight: '600'}}>
                    <span style={{color: 'green'}}> +{status.posReputation}</span>/
                    <span style={{color: 'red'}}>-{status.negReputation}</span>
                </span>
            </p>
            <p>Jan 30, 14:00 UTC</p>
        </div>
    )
})