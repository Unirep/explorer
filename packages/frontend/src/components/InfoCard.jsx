import React from 'react';
import Tooltip from './Tooltip';
import './infoCard.css'


const InfoCard = ({ heading, value, valueIsNum })  => {
    return (
        <div className='info-card'>
            <div className='flex'>
                <h4>{heading}</h4>
                <Tooltip text='Some info goes here' maxWidth={200}/>
            </div>
            {valueIsNum ? (
                <h2>{value}</h2>
            ) : (
                <h6>{value}</h6>
            )}
        </div>
    )
}

export default InfoCard