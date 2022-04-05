import type { NextPage } from 'next'
import * as React from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'


type Props = {
    content: {
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
    },
}

const Show: NextPage<Props> = ({content}) => { 

    // sample resource -- get typings for later
    const contentResource = {
        "adult": false,
        "backdrop_path": "/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg",
        "created_by": [
            {
                "id": 566273,
                "credit_id": "623ca00ad1a89300885f6b46",
                "name": "Kyle Killen",
                "gender": 2,
                "profile_path": null
            },
            {
                "id": 1324451,
                "credit_id": "623c9fe4a7e363008bde5e74",
                "name": "Steven Kane",
                "gender": 2,
                "profile_path": null
            }
        ],
        "episode_run_time": [
            59
        ],
        "first_air_date": "2022-03-24",
        "genres": [
            {
                "id": 10759,
                "name": "Action & Adventure"
            },
            {
                "id": 10765,
                "name": "Sci-Fi & Fantasy"
            }
        ],
        "homepage": "https://www.paramountplus.com/shows/halo/",
        "id": 52814,
        "in_production": true,
        "languages": [
            "af",
            "en",
            "eo",
            "pt",
            "ug"
        ],
        "last_air_date": "2022-03-31",
        "last_episode_to_air": {
            "air_date": "2022-03-31",
            "episode_number": 2,
            "id": 3608117,
            "name": "Unbound",
            "overview": "John takes Kwan to an old friend and learns more about the mystery object, which the Covenant and Makee are determined to steal. With the alien threat growing, Dr. Halsey has a plan to deal with John’s unpredictable behavior.",
            "production_code": "",
            "season_number": 1,
            "still_path": "/wsBa3hDCmUg3h7c6h27KqhbhCff.jpg",
            "vote_average": 6.125,
            "vote_count": 8
        },
        "name": "Halo",
        "next_episode_to_air": {
            "air_date": "2022-04-07",
            "episode_number": 3,
            "id": 3619242,
            "name": "Emergence",
            "overview": "John meets his new partner, and he discovers secrets inside his own memory. Kwan wants to return to Madrigal to continue her people’s fight for independence, but Soren has other plans for her. Makee initiates her plan to retrieve the Madrigal object, with deadly consequences.",
            "production_code": "",
            "season_number": 1,
            "still_path": null,
            "vote_average": 0,
            "vote_count": 0
        },
        "networks": [
            {
                "name": "Paramount+",
                "id": 4330,
                "logo_path": "/fi83B1oztoS47xxcemFdPMhIzK.png",
                "origin_country": "US"
            }
        ],
        "number_of_episodes": 9,
        "number_of_seasons": 1,
        "origin_country": [
            "US"
        ],
        "original_language": "en",
        "original_name": "Halo",
        "overview": "Depicting an epic 26th-century conflict between humanity and an alien threat known as the Covenant, the series weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future.",
        "popularity": 6083.266,
        "poster_path": "/nJUHX3XL1jMkk8honUZnUmudFb9.jpg",
        "production_companies": [
            {
                "id": 7671,
                "logo_path": "/r7KeUsNVv0iggZRh6XmNNq2OEw1.png",
                "name": "Amblin Television",
                "origin_country": "US"
            },
            {
                "id": 115160,
                "logo_path": null,
                "name": "One Big Picture",
                "origin_country": ""
            },
            {
                "id": 115161,
                "logo_path": null,
                "name": "Chapter Eleven",
                "origin_country": ""
            },
            {
                "id": 48856,
                "logo_path": "/gyEyIXqnVkOxjbASaWthewkjGgI.png",
                "name": "343 Industries",
                "origin_country": "US"
            },
            {
                "id": 4343,
                "logo_path": "/rXq1B1Hnkdnw6soz1zoGcslK3wb.png",
                "name": "Showtime Networks",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "seasons": [
            {
                "air_date": "2022-03-24",
                "episode_count": 2,
                "id": 284981,
                "name": "Specials",
                "overview": "",
                "poster_path": null,
                "season_number": 0
            },
            {
                "air_date": "2022-03-24",
                "episode_count": 9,
                "id": 105701,
                "name": "Season 1",
                "overview": "",
                "poster_path": "/nJUHX3XL1jMkk8honUZnUmudFb9.jpg",
                "season_number": 1
            }
        ],
        "spoken_languages": [
            {
                "english_name": "Afrikaans",
                "iso_639_1": "af",
                "name": "Afrikaans"
            },
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            },
            {
                "english_name": "Esperanto",
                "iso_639_1": "eo",
                "name": "Esperanto"
            },
            {
                "english_name": "Portuguese",
                "iso_639_1": "pt",
                "name": "Português"
            },
            {
                "english_name": "Uighur",
                "iso_639_1": "ug",
                "name": ""
            }
        ],
        "status": "Returning Series",
        "tagline": "Find the Halo, win the war.",
        "type": "Scripted",
        "vote_average": 8.9,
        "vote_count": 290
    }

    React.useEffect(() => {
        console.log(content)
    }, []);

    return (<>

        <section className="h-[250px] relative bg-slate-900">
            <Image className='opacity-50 pointer-events-none' layout='fill' objectFit='cover' unoptimized src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}/>
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
export async function getServerSideProps(context) {

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