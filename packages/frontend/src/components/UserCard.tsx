import { FC } from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'

type Props = {
    id: string;
    signUp: string;
    epochsMade: string;
    lastSeen: string;
    totalRep: string
}

const UserCard: FC<Props> = ({ id, signUp, epochsMade, lastSeen, totalRep })  => {
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