import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import './eventCard.css'

export default observer(({ commitment, epoch })  => {
    return (
        <div className='event-card'>
            <Link to={`/user/${commitment}`}>
                <p><span>{commitment.slice(0, 10)}</span>...<span>{commitment.slice(-5)}</span></p>
            </Link>
            <p>epoch # {epoch}</p>
        </div>
    )
})