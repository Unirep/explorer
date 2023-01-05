import { FC } from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'

type Props = {
    repReceived: string;
    attester: string;
    epoch: string;
}

const UserEvent: FC<Props> = ({ repReceived, attester, epoch })  => {
    return (
        <div className='event-card'>
            <p>{repReceived}</p>
            <Link to={`/attester/${attester}`}><p>{attester}</p></Link>
            <p>{epoch}</p>
        </div>
    )
} 
export default UserEvent