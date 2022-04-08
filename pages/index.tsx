import type { NextPage } from "next"
import Image from "next/image"
import * as React from "react"

import useMovieTVSearch from "../hooks/useMovieTVSearch"

import Page from "../components/Page"

import { SearchIcon } from "@heroicons/react/solid"
import useFunctionOnTimer from "../hooks/useFunctionOnTimer"

type Props = {
  initialContentTV: {
    page: number
    results: tvResult[]
    total_pages: number
    total_results: number
  }
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
  const [searchTerm, setSearchTerm, handleSearch, searchInputRef] =
    useMovieTVSearch()

  const [currBackdropIndex, setCurrBackdropIndex] = React.useState<number>(0)

  const backdropMap: { [str: string]: string } = {
    Halo: "/1qpUk27LVI9UoTS7S0EixUBj5aR.jpg",
    MoonKnight: "/64a8imymtJ4WOzIeyUHLtZnJ3wv.jpg",
    PeakyBlinders: "/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg",
    TheFlash: "/41yaWnIT8AjIHiULHtTbKNzZTjc.jpg",
    TheWalkingDead: "/wvdWb5kTQipdMDqCclC6Y3zr4j3.jpg",
  }

  const backdropKeys = Object.keys(backdropMap);

  // Custom hook:
  // Args:
  //  1. Function
  //  2. Args[]
  //  3. Interval in Mins
  useFunctionOnTimer(setCurrBackdropIndex, [((prevIndex: number) => (prevIndex === (backdropKeys.length - 1)) ? 0 : prevIndex + 1 )], 0.5)

  return (
    <>
      {/* LANDING PAGE RIBBON */}
      <section className="h-[450px] relative bg-slate-900  dark:bg-slate-700">
        <Image
          className="opacity-50 pointer-events-none select-none"
          layout="fill"
          objectFit="cover"
          priority
          src={`https://image.tmdb.org/t/p/original${backdropMap[backdropKeys[currBackdropIndex]]}`}
          alt=""
        />

        <div
          id="headInfoCover"
          className="text-left absolute top-0 left-0 right-0 bottom-0"
        >
          <div className="h-full grid place-content-center">
            <h1 className="text-4xl text-gray-200 font-bold py-3">
              Welcome to Another Entertainment Database.
            </h1>

            {/* Search Component */}
            <div className="group sm:min-w-[7rem] my-3 px-1 rounded-full bg-gray-300 bg-opacity-80 dark:bg-slate-800 dark:bg-opacity-80 drop-shadow-sm text-xl">
              <form onSubmit={handleSearch} className="flex h-10 items-center">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  ref={searchInputRef}
                  type={"text"}
                  className="h-full w-[95%] pl-2 justify-self-start rounded-full border-none focus:outline-none bg-transparent placeholder:text-black dark:placeholder:text-gray-400"
                  placeholder="Find something awesome to watch tonight..."
                />
                <a href="#" onClick={handleSearch} className="mx-auto">
                  <SearchIcon
                    className={
                      "h-5 w-5 transition-colors text-indigo-600 hover:text-indigo-400  dark:text-indigo-400 dark:hover:text-indigo-300"
                    }
                  />
                </a>
              </form>
            </div>
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
      initialContentMovies,
    },
  }
}
