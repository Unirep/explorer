import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const UserEvent = ({ attesterId, epoch })  => {
    return (
        <div className='event-card'>
            <Link to={`/attester/${attesterId}`}>
                <p>0x<span>{attesterId.slice(0, 2)}</span>...<span>{attesterId.slice(-6, -1)}</span></p>
            </Link>
            <p>{epoch}</p>
            <p>idk</p>
        </div>
    )
}
export default UserEvent
