import React from 'react';
import { observer } from 'mobx-react-lite';
import Tooltip from './Tooltip';
import './infoCard.css'

export default observer(({ item, info })  => {
    return (
        <>
            <div className='flex'>
                <h5>{item}</h5>
                <Tooltip text='Some info goes here' maxWidth={200} />
            </div>
            <h6 className='break'>{info}</h6>
        </>
    )
})