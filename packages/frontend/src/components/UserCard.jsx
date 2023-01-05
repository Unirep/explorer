import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const UserCard = ({ id, signUp, epochsMade, lastSeen, totalRep })  => {
    return (
        <div className='event-card'>
            <Link to={`/user/${id}`}><p>{id}</p></Link>
            <p>epoch # {signUp}</p>
            <p>{epochsMade}</p>
            <p>epoch # {lastSeen}</p>
            <p>{totalRep}</p>
        </div>
    )
} 
export default UserCard