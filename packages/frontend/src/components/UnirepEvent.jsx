import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const UnirepEvent = ({ address, appName, epoch, user, repGiven })  => {
    return (
        <div className="event-card">
            <Link to={`attester/${address}`}>
                <p>0x<span>{address.slice(0, 2)}</span>...<span>{address.slice(-6, -1)}</span></p>
            </Link>
            <p>{appName}</p>
            <p>{epoch}</p>
            <Link to={`user/${user}`}>
                <p><span>{user.slice(0, 4)}</span>...<span>{user.slice(-6, -1)}</span></p>
            </Link>
            <p>{repGiven}</p>
        </div>
    )
}

export default UnirepEvent