import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import './eventCard.css'

export default observer(({ status, nextEpoch })  => {
    return (
        <div className="event-card">
            <Link to={`attester/${status.attesterId}`}>
                <p>0x<span>{status.attesterId.slice(0, 2)}</span>...<span>{status.attesterId.slice(-6, -1)}</span></p>
            </Link>
            <p>Epoch #{status.currentEpoch}</p>
            <p>{status.numUsers}</p>
            <p>positive:<span style={{color: 'green'}}>{status.posReputation}</span>  negative:<span style={{color: 'red'}}>{status.negReputation}</span></p>
            <p>{nextEpoch}</p>
        </div>
    )
})