import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const UnirepEvent = ({ address, appName, epoch, user, repGiven })  => {
    return (
        <div className="event-card">
            <Link to={`attester/${address}`}><p>{address}</p></Link>
            <p>{appName}</p>
            <p>{epoch}</p>
            <Link to={`user/${user}`}><p>{user}</p></Link>
            <p>{repGiven}</p>
        </div>
    )
}

export default UnirepEvent