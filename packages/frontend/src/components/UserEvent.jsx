import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const UserEvent = ({ attester, epoch, time })  => {
    return (
        <div className='event-card'>
            <Link to={`/attester/${attester}`}>
                <p>0x<span>{attester.slice(0, 2)}</span>...<span>{attester.slice(-6, -1)}</span></p>
            </Link>
            <p>{epoch}</p>
            <p>{time}</p>
        </div>
    )
} 
export default UserEvent