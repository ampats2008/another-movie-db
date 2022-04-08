import type { NextPage } from "next"
import Image from "next/image"
import * as React from "react"
import { useRef, useEffect, useState } from "react"

import Page from "../components/Page"

type Props = {
  initialContentTV: {
    page: number
    results: tvResult[]
    total_pages: number
    total_results: number
  },
  initialContentMovies: {
    page: number
    results: tvResult[]
    total_pages: number
    total_results: number
  }
}

// note: result isn't the same when returned by discover/movies vs. discover/tv
// need to update this with another type
export interface tvResult {
  backdrop_path: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

const Home: NextPage<Props> = ({ initialContentTV, initialContentMovies }) => {

  return (
    <>
      {/* LANDING PAGE RIBBON */}
      <section className="h-[450px] relative bg-slate-900  dark:bg-slate-700">
        <Image
          className="opacity-50 pointer-events-none select-none"
          layout="fill"
          objectFit="cover"
          priority
          src={`https://image.tmdb.org/t/p/original${"/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg"}`}
          alt=''
        />

        <div id="headInfo" className="text-left absolute abs-center">
          <h1 className="capitalize text-4xl text-gray-200 font-bold py-3">
            {"Halo"}{" "}
            <span className="opacity-60">({2022})</span>
          </h1>
          <h1 className="text-2xl italic text-gray-200 font-normal py-3">
            {"Find the Halo, win the war."}
          </h1>

          <div className="py-3 max-w-[55ch] leading-8">
            <p
              id="maturityRating"
              className="inline font-semibold text-slate-900 text-lg w-fit px-[6px] py-[4px] rounded-lg bg-gray-200 bg-opacity-80"
            >
              {'TV-14'}
            </p>
            <p className="ml-3 inline text-lg text-gray-200">
              {" "}
                <span
                  className="after:content-['_/_'] last:after:content-['']"
                >
                  {'Action & Adventure / Sci-Fi & Fantasy'}
                </span>
            </p>
          </div>
        </div>
      </section>
      <Page mediaType="tv" initialContent={initialContentTV} />
      <Page mediaType="movie" initialContent={initialContentMovies} />
    </>
  )
}

export default Home

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  )
  const initialContentTV = await res.json()

  const res2 = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  )
  const initialContentMovies = await res2.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      initialContentTV,
      initialContentMovies
    },
  }
}
