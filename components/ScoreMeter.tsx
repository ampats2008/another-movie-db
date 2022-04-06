import * as React from 'react';


type Props = {
    vote_average:   number,
    pos:            string,    // defaults to abs top-left corner
    viewPortSize: string,
    viewBox: string,
}
 
const ScoreMeter: React.FC<Props> = ({vote_average, viewPortSize='h-[50px] w-[50px]', viewBox="0 0 40 40", pos='absolute top-1 left-1'}) => {

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
        <svg id='popularityMeter' className={`${viewPortSize} ${pos} p-1`} viewBox={viewBox}>
            <circle className={`popularityMeter ${meterColor}`} r="15" cx="50%" cy="49%" fill="rgba(0,0,0,0.4)" strokeWidth='4'  strokeDasharray='94' strokeDashoffset={endingStrokeDashOffset}/>
            <text className='fill-white'x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="0.9rem">{scoreIndex}</text>
            <title>Average User Rating</title>
        </svg>
        </>
    );
}
 
export default ScoreMeter;