import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const UnirepEvent = ({ address, current, users, reputation, nextEpoch })  => {
    return (
        <div className="event-card">
            <Link to={`attester/${address}`}>
                <p>0x<span>{address.slice(0, 2)}</span>...<span>{address.slice(-6, -1)}</span></p>
            </Link>
            <p>Epoch #{current}</p>
            <p>{users}</p>
            <p>{reputation}</p>
            <p>{nextEpoch}</p>
        </div>
    )
}

export default UnirepEvent