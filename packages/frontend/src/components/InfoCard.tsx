import { FC } from 'react';
import './infoCard.css'

type Props = {
    heading: string;
    tooltip: JSX.Element;
    value: string;
    valueIsNum: boolean
}

const InfoCard: FC<Props> = ({ heading, tooltip, value, valueIsNum })  => {
    return (
        <div className='info-card'>
            <div className='flex'>
                <h4>{heading}</h4>
                <h6>{tooltip}</h6>
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