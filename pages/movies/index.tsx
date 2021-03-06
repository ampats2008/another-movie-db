import type { NextPage } from "next"
import * as React from "react"
import { useRef, useEffect, useState } from "react"

import Page from "../../components/Page"
import Pagination from "../../components/Pagination"
import PosterCard from "../../components/PosterCard"

type Props = {
  initialContent: {
    page: number
    results: MovieResult[]
    total_pages: number
    total_results: number
  }
}

export interface MovieResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: OriginalLanguage
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Fr = "fr",
  Sv = "sv",
}

const Movies: NextPage<Props> = ({ initialContent }) => {
  // hooks
  const [pageIndex, setPageIndex] = useState<number>(1)

  return (
    <>
      <Page
        mediaType="movie"
        {...{ pageIndex, setPageIndex, initialContent }}
        renderCards={(cards, mediaType) => (
          <>
            <section className="flex flex-wrap justify-center">
              {cards.map((contentRes) => (
                <PosterCard
                  key={contentRes.id}
                  contentResource={contentRes}
                  mediaType={mediaType}
                />
              ))}
            </section>
          </>
        )}
      />
      <Pagination {...{ pageIndex, setPageIndex }} />
    </>
  )
}

export default Movies

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&with_original_language=en&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.gte=1950-01-01&vote_average.gte=2&page=1&with_watch_monetization_types=flatrate`
  )
  const initialContent : {
    page: number
    results: MovieResult[]
    total_pages: number
    total_results: number
  } = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      initialContent
    },
  }
}
