import * as React from 'react';
import ScoreMeter from './ScoreMeter';
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {
    result : {
        poster_path?:       null | string;
        popularity:         number;
        id:                 number;
        overview?:          string;
        backdrop_path?:     null | string;
        vote_average?:      number;
        media_type:         MediaType;
        first_air_date?:    string;
        origin_country?:    string[];
        genre_ids?:         number[];
        original_language?: OriginalLanguage;
        vote_count?:        number;
        name?:              string;
        original_name?:     string;
        adult?:             boolean;
        release_date?:      Date;
        original_title?:    string;
        title?:             string;
        video?:             boolean;
        profile_path?:      null | string;
    }
}

export interface Result {
    poster_path?:       null | string;
    popularity:         number;
    id:                 number;
    overview?:          string;
    backdrop_path?:     null | string;
    vote_average?:      number;
    media_type:         MediaType;
    first_air_date?:    string;
    origin_country?:    string[];
    genre_ids?:         number[];
    original_language?: OriginalLanguage;
    vote_count?:        number;
    name?:              string;
    original_name?:     string;
    adult?:             boolean;
    release_date?:      Date;
    original_title?:    string;
    title?:             string;
    video?:             boolean;
    profile_path?:      null | string;
}

export enum MediaType {
    Movie = "movie",
    Person = "person",
    Tv = "tv",
}

export enum OriginalLanguage {
    En = "en",
    It = "it",
}
 
const SearchResult: React.FC<Props> = ({result}) => {

    console.log(result)
    // capitalize Movie and uppercase TV
    const mediaType = (result.media_type === 'tv') ? 'TV' : 'Movie';

    // differentiate props based on media-type
    const ipName = (result.media_type === 'tv') ? result.name : result.title;
    const releaseDate = (result.media_type === 'tv') ? result.first_air_date : result.release_date;

    const router = useRouter();

    const goToResultPage : React.MouseEventHandler = (e) => {
        e.preventDefault();

        if (result.media_type === 'tv') {
            router.push(`/shows/${result.id}`);
        } else {
            router.push(`/movies/${result.id}`);
        }
        
    }

    return (
        <div className='my-24 max-w-screen-lg flex-nowrap bg-gray-100 rounded sm:flex shadow-sm'>
                    
            {(result.poster_path) &&
            <div onClick={goToResultPage} className={`h-[300px] sm:h-auto sm:w-[200px] relative lg:scale-[1.08] transition-all ease-out hover:scale-[1.05] lg:hover:scale-[1.1] cursor-pointer`}>
                <Image className='rounded-lg' layout='fill' objectFit='cover' src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} priority/>
                <ScoreMeter vote_average={result.vote_average} />
            </div>}
        
            <div id='ep-listing-info' className='p-3 flex-[1_1_0%] sm:grid lg:p-6 min-h-[300px]' style={{gridTemplateAreas: `'title date' 'desc desc'`}}>
        
                <p className='text-lg font-bold inline' style={{gridArea: 'title'}}>{ipName}, <i>{mediaType}</i></p>
                <p className='text-lg sm:text-right' style={{gridArea: 'date'}}>Released: {releaseDate}</p>
                <p className='text-lg indent-[4ch] mt-4' style={{gridArea: 'desc'}}>{result.overview}</p>
        
            </div>           
        </div>
    );
}
 
export default SearchResult;
