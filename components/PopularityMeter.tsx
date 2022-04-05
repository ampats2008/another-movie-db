import * as React from 'react';


type Props = {
    popIndex: number,
    popStrokeDashoffset: number,
}
 
const PopularityMeter: React.FC<Props> = ({popStrokeDashoffset, popIndex}) => {
    return (
        <>
        <svg id='popularityMeter' className='absolute -top-4 -left-4' width="100" height="100" viewBox="0 0 100 100">
            <circle className='popularityMeter stroke-green-400' r="15" cx="50%" cy="49%" fill="rgba(0,0,0,0.4)" strokeWidth='4' strokeDasharray='115' strokeDashoffset={popStrokeDashoffset}/>
            <text className='fill-white'x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="1rem">{popIndex}</text>
        </svg>
        </>
    );
}
 
export default PopularityMeter;