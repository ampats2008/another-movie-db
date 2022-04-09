import type { NextPage } from "next"
import * as React from "react"
import { useRef, useEffect, useState } from "react"

import Page from "../../components/Page"
import Pagination from "../../components/Pagination"
import PosterCard from "../../components/PosterCard"

type Props = {
  initialContent: {
    page: number
    results: TVResult[]
    total_pages: number
    total_results: number
  }
}

export interface TVResult {
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

const Shows: NextPage<Props> = ({ initialContent }) => {
  // hooks
  const [pageIndex, setPageIndex] = useState<number>(1)

  return (
    <>
      <Page
        mediaType="tv"
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

export default Shows

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  )
  const initialContent = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      initialContent,
    },
  }
}
