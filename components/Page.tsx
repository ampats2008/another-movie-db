import * as React from "react"
import { useRef, useEffect, useState } from "react"

import { Spinner } from "../components/Spinner"
import { PageError } from "../components/PageError"
import OrderByControl from "../components/OrderByControl"

import useGetTVOrMovies from "../hooks/useGetTVOrMovies"
import { useRouter } from "next/router"

type Props = {
  mediaType: string
  pageIndex?: number
  setPageIndex?: React.Dispatch<React.SetStateAction<number>>
  renderCards: (
    cards: TVResult[] | MovieResult[],
    mediaType: string
  ) => JSX.Element
  initialContent: {
    page: number
    results: TVResult[] | MovieResult[]
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

type useGetTVOrMoviesObj = {
  data: {
    page: number
    results: TVResult[] | MovieResult[]
    total_pages: number
    total_results: number
  }
  isLoading: boolean
  isError: boolean
}

const Page: React.FC<Props> = ({
  mediaType,
  pageIndex = 1,
  setPageIndex,
  initialContent,
  renderCards,
}) => {
  // hooks
  const [sortBy, setSortBy] = useState<string>("popularity")
  const [sortDirection, setSortDirection] = useState<string>(".desc")
  const { data, isLoading, isError }: useGetTVOrMoviesObj = useGetTVOrMovies({
    mediaType,
    pageIndex,
    sortBy: `${sortBy}${sortDirection}`,
    fallbackData: initialContent,
  })

  const orderByArrowRef = useRef<SVGSVGElement | null>(null)

  const btnDirClass = sortDirection === ".desc" ? "rotate-0" : "rotate-180"

  const router = useRouter()

  // error state
  if (isError) return <PageError error={isError} />

  // loading state
  if (isLoading) return <Spinner />

  // page without errors
  return (
    <>
      {/* HEAD SECTION */}
      <div className="mx-auto w-[90%]">
        <h1 className="my-7 font-semibold text-3xl">
          {mediaType === "tv" ? "TV Shows" : "Movies"}
        </h1>
        <section className="my-7 lg:flex lg:justify-between">
          <h2 className="font-semibold text-2xl">
            {/* display a greeting based on current page / mediaType */}
            {mediaType === "tv"
              ? router.route !== "/"
                ? "Find something bingeworthy:"
                : "What people are binging right now:"
              : "Get your popcorn ready:"}
          </h2>
          {/* Order By control --- only display this component if we are not on 
          the home page and if setPageIndex is defined: */}
          {router.route !== "/" && setPageIndex && (
            <OrderByControl
              ref={orderByArrowRef}
              {...{
                sortBy,
                setSortBy,
                setPageIndex,
                setSortDirection,
                btnDirClass,
              }}
            />
          )}
        </section>
        <hr className="border-none h-[1px] bg-gray-400 dark:bg-gray-600" />
      </div>
      {/* CARD CONTAINER */}
      
      {renderCards(data.results, mediaType)}
    </>
  )
}

export default Page
