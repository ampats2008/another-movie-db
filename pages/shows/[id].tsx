import type { NextPage } from 'next'
import * as React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'

type Props = {
    content: {
        adult:                boolean;
        backdrop_path:        string;
        created_by:           CreatedBy[];
        episode_run_time:     number[];
        first_air_date:       Date;
        genres:               Genre[];
        homepage:             string;
        id:                   number;
        in_production:        boolean;
        languages:            string[];
        last_air_date:        Date;
        last_episode_to_air:  TEpisodeToAir;
        name:                 string;
        next_episode_to_air:  TEpisodeToAir;
        networks:             Network[];
        number_of_episodes:   number;
        number_of_seasons:    number;
        origin_country:       string[];
        original_language:    string;
        original_name:        string;
        overview:             string;
        popularity:           number;
        poster_path:          string;
        production_companies: Network[];
        production_countries: ProductionCountry[];
        seasons:              Season[];
        spoken_languages:     SpokenLanguage[];
        status:               string;
        tagline:              string;
        type:                 string;
        vote_average:         number;
        vote_count:           number;
    },
}

export interface CreatedBy {
    id:           number;
    credit_id:    string;
    name:         string;
    gender:       number;
    profile_path: null;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface TEpisodeToAir {
    air_date:        Date;
    episode_number:  number;
    id:              number;
    name:            string;
    overview:        string;
    production_code: string;
    season_number:   number;
    still_path:      null | string;
    vote_average:    number;
    vote_count:      number;
}

export interface Network {
    name:           string;
    id:             number;
    logo_path:      null | string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface Season {
    air_date:      Date;
    episode_count: number;
    id:            number;
    name:          string;
    overview:      string;
    poster_path:   null | string;
    season_number: number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

const Show: NextPage<Props> = ({content}) => {

    React.useEffect(() => {
        console.log(content)
    }, []);

    return (<>

        <section className="h-[250px] relative bg-slate-900">
            <Image className='opacity-50 pointer-events-none' layout='fill' objectFit='cover' priority src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}/>
            <h1 className="uppercase text-4xl text-white font-bold text-center absolute abs-center" style={{transform: 'translate(-50%, -150%)'}}>
                {content.name}</h1>
            <h1 className="text-2xl italic text-white font-normal text-center absolute abs-center" style={{transform: 'translate(-50%, 30%)'}}>{content.tagline}</h1>
        </section>


        <section className="mt-10">
            <h1>{content.overview}</h1>
        </section>
        

    </>)
}

export default Show

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps(context:any) {

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://api.themoviedb.org/3/tv/${context.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
  const content = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      content,
    },
  }
}