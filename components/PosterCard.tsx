import * as React from 'react'
import Image from 'next/image'
import ScoreMeter from './ScoreMeter'
import { useRouter } from 'next/router'

type Props = {
    contentResource : {
        backdrop_path: string;
        first_air_date: string;
        genre_ids: number[];
        id: number;
        name: string;
        origin_country: string[];
        original_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string;
        vote_average: number;
        vote_count: number;
    }
}
 
const PosterCard: React.FC<Props> = ({contentResource}) => {

    const router = useRouter();

    const goToShowPage : React.MouseEventHandler = (e) => {
        e.preventDefault();
        router.push(`/shows/${contentResource.id}`);
    }


    return (
        <div id='card' className='m-10 w-min rounded-lg transition-all ease-out hover:scale-[1.05] cursor-pointer drop-shadow-md hover:drop-shadow-2xl will-change-[filter]' onClick={goToShowPage}>
          <div id='posterCont' className='w-[200px] h-[300px] relative'>
            <Image className='rounded-lg' layout='fill' objectFit='cover' src={`https://image.tmdb.org/t/p/w500${contentResource.poster_path}`} priority/>

            <ScoreMeter vote_average={contentResource.vote_average} />
          </div>
        </div>
    );
}
 
export default PosterCard;