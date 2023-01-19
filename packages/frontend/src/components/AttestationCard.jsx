import React from 'react';
import { Link } from "react-router-dom";
import './eventCard.css'


const AttestationCard = ({ epochKey, posRep, negRep, graffiti })  => {
    return (
        <div className='event-card'>
            <p>{epochKey}</p>
            <p style={{color: 'green'}}>+{posRep}</p>  
            <p style={{color: 'red'}}>-{negRep}</p>
            <p>{graffiti}  <img src={require('../../public/arrow_up_right.svg')} alt="arrow up right"/></p>        
        </div>
    )
} 
export default AttestationCard