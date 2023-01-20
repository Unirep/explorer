import React from 'react';
import { observer } from 'mobx-react-lite';
import Tooltip from './Tooltip';
import './infoCard.css'

export default observer(({ heading, value })  => {
    return (
        <div className='info-card'>
            <div className='flex'>
                <h4>{heading}</h4>
                <Tooltip text='Some info goes here' maxWidth={200}/>
            </div>
            {isNaN(value) ? (
                <h6>{value}</h6>
            ) : (
                <h2>{value}</h2>
            )}
        </div>
    )
})