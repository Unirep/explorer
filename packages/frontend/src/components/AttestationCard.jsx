import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const AttestationCard = ({ epochKey, repGiven })  => {
    return (
        <div className='event-card'>
            <p>{epochKey}</p>
            <p>{repGiven}</p>
        </div>
    )
} 
export default AttestationCard