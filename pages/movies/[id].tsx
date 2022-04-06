import type { NextPage } from 'next'
import * as React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head';
import EpisodeListing from '../../components/EpisodeListing'
import CastList from '../../components/CastList'

type Props = {
    content: {
        adult:                 boolean;
        backdrop_path:         string;
        belongs_to_collection: null;
        budget:                number;
        genres:                Genre[];
        homepage:              string;
        id:                    number;
        imdb_id:               string;
        original_language:     string;
        original_title:        string;
        overview:              string;
        popularity:            number;
        poster_path:           null;
        production_companies:  ProductionCompany[];
        production_countries:  ProductionCountry[];
        release_date:          Date;
        revenue:               number;
        runtime:               number;
        spoken_languages:      SpokenLanguage[];
        status:                string;
        tagline:               string;
        title:                 string;
        video:                 boolean;
        vote_average:          number;
        vote_count:            number;
    },
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name:      string;
}

const Movie: NextPage<Props> = ({content}) => {

    React.useEffect(() => {
    }, []);

    const releaseDate = new Date(`${content.release_date} 00:00:00`);

    return (<>

        <Head>
            <title>{content.title} ({releaseDate.getFullYear()})</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

    
        <section className="h-[250px] relative bg-slate-900">
            <Image className='opacity-50 pointer-events-none select-none' layout='fill' objectFit='cover' priority src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}/>

            <div id='headInfo' className='text-left absolute abs-center'>

                <h1 className="capitalize text-4xl text-gray-200 font-bold py-3">
                    {content.title} <span className='opacity-60'>({releaseDate.getFullYear()})</span></h1>
                <h1 className="text-2xl italic text-gray-200 font-normal py-3">{content.tagline}</h1>

                <div className='py-3 max-w-[55ch] leading-8'>
                    <p id='maturityRating' className="inline font-semibold text-slate-900 text-lg w-fit px-[6px] py-[4px] rounded-lg bg-gray-200 bg-opacity-80">{content.maturityRating}</p>
                    <p className='ml-3 inline text-lg text-gray-200'> {content.genres.map(genre => <span className="after:content-['_/_'] last:after:content-['']" key={`${genre.id}-${genre.name}`}>{genre.name}</span>)}</p>
                </div>

            </div>
        </section>

        <div className='xl:grid lg:max-w-[75vw] lg:mx-auto grid-y-5 grid-cols-[3fr,_5fr]' style={{gridTemplateAreas: `'oview oview' 'cast cast'`}}>

            <section className="mt-10 p-10 xl:p-5" style={{gridArea: 'oview'}}>
                <h2 className='capitalize font-semibold text-2xl mb-6'>Overview</h2>            
                <p className='indent-[4ch] mt-10 text-lg leading-loose'>{content.overview}</p>
            </section>

            {/* <section className="mt-10 p-10 xl:p-5" style={{gridArea: 'lastEp'}}>
                <h2 className='capitalize font-semibold text-2xl mb-6'>Last Episode</h2>
                <EpisodeListing episode={content.last_episode_to_air}/>
            </section>
            */}

            <section className="mt-10 p-10 xl:p-5" style={{gridArea: 'cast'}}>
                <h2 className='capitalize font-semibold text-2xl mb-6'>Cast</h2>            
                <CastList contentID={content.id} />
            </section>

        </div>
        

    </>)
}

export default Movie

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps(context:any) {

    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(`https://api.themoviedb.org/3/movie/${context.params.id}?api_key=${process.env.API_KEY}&language=en-US`)
    const contentInfo = await res.json()

    // fetch maturity rating (TV-14, TV-MA, etc.)
    const res2 = await fetch(`https://api.themoviedb.org/3/movie/${context.params.id}/release_dates?api_key=${process.env.API_KEY}&language=en-US`);

    const data:any = await res2.json();

    let maturityRating = 'NR';

    // if resource could not be found, leave response as 'NR' (Not Rated)
    if (res2.status !== 404 && data.results.length !== 0) {
    
        const maturityRatings : { results: [{ iso_3166_1: string, release_dates: [{certification:string}] }], id: number } = data;

        // get US rating string if it exists, otherwise just use the first object to retrieve it
        let ratingUSorUndefined = maturityRatings.results.find(el => (el.iso_3166_1 === 'US'));

        // console.log( 'RESPONSE: ', data )

        maturityRating = (ratingUSorUndefined === undefined) ? maturityRatings.results[0].release_dates[0].certification : ratingUSorUndefined.release_dates[0].certification;
    }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      content: {...contentInfo, maturityRating},
      // only return rating string from rating object
    },
  }
}