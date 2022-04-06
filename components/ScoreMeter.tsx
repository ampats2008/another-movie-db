import * as React from 'react';


type Props = {
    vote_average: number,
}
 
const ScoreMeter: React.FC<Props> = ({vote_average}) => {

    const endingStrokeDashOffset = 94 - (Math.floor((vote_average / 10)*94));
    const scoreIndex = Math.floor((vote_average / 10)*94);

    const setMeterColor = (scoreIndex:number) => {
        if (scoreIndex > 80) return 'stroke-green-400'
        if (scoreIndex > 70) return 'stroke-lime-400'
        if (scoreIndex > 60) return 'stroke-amber-400'
        if (scoreIndex > 50) return 'stroke-orange-400'
        return 'stroke-red-500'
    }

    const meterColor = setMeterColor(scoreIndex);

    return (
        <>
        <svg id='popularityMeter' className='absolute -top-4 -left-4' width="100" height="100" viewBox="0 0 100 100">
            <circle className={`popularityMeter ${meterColor}`} r="15" cx="50%" cy="49%" fill="rgba(0,0,0,0.4)" strokeWidth='4'  strokeDasharray='94' strokeDashoffset={endingStrokeDashOffset}/>
            <text className='fill-white'x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="0.9rem">{scoreIndex}</text>
            <title>Average User Rating</title>
        </svg>
        </>
    );
}
 
export default ScoreMeter;