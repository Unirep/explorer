import { FC } from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'

type Props = {
    epochKey: string;
    repGiven: string
}

const AttestationCard: FC<Props> = ({ epochKey, repGiven })  => {
    return (
        <div className='event-card'>
            <p>{epochKey}</p>
            <p>{repGiven}</p>
        </div>
    )
} 
export default AttestationCard