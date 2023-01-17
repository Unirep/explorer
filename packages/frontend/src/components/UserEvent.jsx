import React from 'react';
import { observer } from 'mobx-react-lite'
import { Link } from "react-router-dom";
import './eventCard.css'


export default observer(({ signup })  => {
    return (
        <div className='event-card'>
            <Link to={`/attester/${signup.attesterId}`}>
                <p>0x<span>{signup.attesterId.slice(0, 2)}</span>...<span>{signup.attesterId.slice(-6, -1)}</span></p>
            </Link>
            <p>{signup.epoch}</p>
            <p>idk</p>
        </div>
    )
})
