import * as React from 'react';
import ScoreMeter from './ScoreMeter';
import Image from 'next/image'

type Props = {
    episode: {
        air_date:        string;
        episode_number:  number;
        id:              number;
        name:            string;
        overview:        string;
        production_code: string;
        season_number:   number;
        still_path:      null | string;
        vote_average:    number;
        vote_count:      number;
    },
}
 
const EpisodeListing: React.FC<Props> = ({episode}) => {


    return (
        <div className='mt-10 max-w-screen-lg flex-nowrap bg-gray-100 rounded-lg sm:flex'>
                    
            {(episode.still_path) &&
            <div className={`h-[140px] sm:h-auto sm:w-[280px] relative lg:scale-[1.08]`}>
                <Image className='rounded-lg' layout='fill' objectFit='cover' src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} priority/>
                <ScoreMeter vote_average={episode.vote_average} />
            </div>}
        
            <div id='ep-listing-info' className='p-3 flex-[1_1_0%] sm:grid lg:p-6' style={{gridTemplateAreas: `'title date' 'desc desc'`}}>
        
                <p className='text-lg font-bold inline' style={{gridArea: 'title'}}>S{episode.season_number}E{episode.episode_number}: {episode.name}</p>
                <p className='text-lg sm:text-right' style={{gridArea: 'date'}}>{episode.air_date}</p>
                <p className='text-lg indent-[4ch] mt-4' style={{gridArea: 'desc'}}>{episode.overview}</p>
        
            </div>           
        </div>
    );
}
 
export default EpisodeListing;
