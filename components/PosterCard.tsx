import * as React from 'react'
import Image from 'next/image'
import PopularityMeter from './PopularityMeter'
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

    // calculated as the current show's popularity divided by the max popularity of the dataset
    const popularityStrokeDashOffset = 115 - (Math.floor((contentResource.popularity / 6083.266)*115));
    const popularityIndex = Math.floor((contentResource.popularity / 6083.266)*100);

    console.log(contentResource.name, contentResource.popularity)


    const goToShowPage : React.MouseEventHandler = (e) => {
        e.preventDefault();
        router.push(`/shows/${contentResource.id}`);
    }


    return (
        <div id='card' className='m-10 bg-sky-900 w-min rounded-lg transition-transform ease-out hover:scale-[1.05] cursor-pointer' onClick={goToShowPage}>
          <div id='posterCont' className='w-[200px] h-[300px] relative'>
            <Image className='rounded-lg' layout='fill' objectFit='cover' unoptimized src={`https://image.tmdb.org/t/p/original${contentResource.poster_path}`}/>

            <PopularityMeter popIndex={popularityIndex} popStrokeDashoffset={popularityStrokeDashOffset} />
          </div>
        </div>
    );
}
 
export default PosterCard;