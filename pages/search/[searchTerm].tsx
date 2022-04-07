import type { NextPage } from "next"
import * as React from "react"
import Head from "next/head"
import SearchResult from "../../components/SearchResult"

type Props = {
  page: number
  results: Result[]
  total_results: number
  total_pages: number
  searchTerm: string
}

export interface Result {
  poster_path?: null | string
  popularity: number
  id: number
  overview?: string
  backdrop_path?: null | string
  vote_average?: number
  media_type: MediaType
  first_air_date?: string
  origin_country?: string[]
  genre_ids?: number[]
  original_language?: OriginalLanguage
  vote_count?: number
  name?: string
  original_name?: string
  adult?: boolean
  release_date?: Date
  original_title?: string
  title?: string
  video?: boolean
  profile_path?: null | string
  known_for?: Result[]
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

const Search: NextPage<Props> = ({
  page,
  results,
  total_results,
  total_pages,
  searchTerm,
}) => {
  const filteredResults = results.filter(
    (result) => result.media_type !== "person" && result.poster_path
  )

  return (
    <>
      <Head>
        <title>Another Movie DB</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:max-w-[75vw] lg:mx-auto">
        <section className="mt-10 p-10 xl:p-5">
          <h2 className="font-semibold text-2xl mb-6">
            We found {filteredResults.length} results for:{" "}
            <span className="capitalize">{searchTerm}</span>
          </h2>
          <hr className="border-none h-[1px] bg-gray-400 dark:bg-gray-600" />

          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <SearchResult
                key={`${result.id}-${result.name}`}
                result={result}
              />
            ))
          ) : (
            <div id="NoResultsFound">
              <p>
                Sorry, there were no results found for your search. Please try
                again.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Search

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps(context: any) {
  const searchTerm = context.params.searchTerm

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
  )
  const data = await res.json()

  // if resource could not be found, return data.results as empty array
  if (!data) {
    return {
      notFound: true,
    }
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: { ...data, searchTerm },
  }
}
