import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const UserCard = ({ commitment, epoch })  => {
    return (
        <div className='event-card'>
            <Link to={`/user/${commitment}`}>
                <p><span>{commitment.slice(0, 10)}</span>...<span>{commitment.slice(-6, -1)}</span></p>
            </Link>
            <p>epoch # {epoch}</p>
        </div>
    )
} 
export default UserCard