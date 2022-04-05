import type { NextPage } from 'next'
import * as React from 'react';

import Image from 'next/image'
import PopularityMeter from '../components/PopularityMeter';
import PosterCard from '../components/PosterCard';

type Props = {
//   content: [{
//     backdrop_path: string;
//     first_air_date: string;
//     genre_ids: number[];
//     id: number;
//     name: string;
//     origin_country: string[];
//     original_language: string;
//     original_name: string;
//     overview: string;
//     popularity: number;
//     poster_path: string;
//     vote_average: number;
//     vote_count: number;
// }],
}

const Home: NextPage<Props> = ({}) => {  
  
  // sample resource
  const contentResource = {
    "backdrop_path": "/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg",
    "first_air_date": "2022-03-24",
    "genre_ids": [
        10759,
        10765
    ],
    "id": 52814,
    "name": "Halo",
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_name": "Halo",
    "overview": "Depicting an epic 26th-century conflict between humanity and an alien threat known as the Covenant, the series weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future.",
    "popularity": 6923.782,
    "poster_path": "/nJUHX3XL1jMkk8honUZnUmudFb9.jpg",
    "vote_average": 8.9,
    "vote_count": 275
  }

  return (<>

      <section className="flex flex-wrap">

        <PosterCard {...{contentResource}} />
        <PosterCard {...{contentResource}} />
        <PosterCard {...{contentResource}} />
        <PosterCard {...{contentResource}} />
        <PosterCard {...{contentResource}} />

      </section>
      

  </>)
}

export default Home

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
// export async function getStaticProps() {

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
//   const content = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       content,
//     },
//   }
// }