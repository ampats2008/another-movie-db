import * as React from "react"
import { useRef, useEffect, useState } from "react"

import { Spinner } from "../components/Spinner"
import { PageError } from "../components/PageError"

import PosterCard from "../components/PosterCard"
import useGetTVOrMovies from "../hooks/useGetTVOrMovies"

type Props = {
  mediaType: string
  pageIndex: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  initialContent: {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
  }
}

export interface Result {
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

type useGetTVOrMoviesObj = {
  data: {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
  }
  isLoading: boolean
  isError: boolean
}

const Page: React.FC<Props> = ({
  mediaType,
  pageIndex,
  setPageIndex,
  initialContent,
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
          {mediaType === "tv"
            ? "TV Shows"
            : "Movies"}
        </h1>
        <section className="my-7 lg:flex lg:justify-between">
          <h2 className="font-semibold text-2xl">
            {mediaType === "tv"
              ? "Find something bingeworthy:"
              : "Get your popcorn ready:"}
          </h2>
          {/* Order By control */}
          <label>
            Order by:
            <svg
              ref={orderByArrowRef}
              onClick={() => {
                setSortDirection((prevSortDir) =>
                  prevSortDir === ".desc" ? ".asc" : ".desc"
                ) // toggle b/w ascending or descending
                setPageIndex(1) // reset to first page
              }}
              className={`h-8 w-8 inline-block mx-[15px] h-8 w-8 dark:text-indigo-400 dark:hover:text-indigo-300 text-indigo-600 hover:text-indigo-400 cursor-pointer transition-all ${btnDirClass}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
            <select
              className="pagination-select dark:bg-slate-900 p-2 mt-7 lg:mt-auto"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                setPageIndex(1)
              }}
            >
              <option value={`popularity`}>Popularity</option>
              <option value={`vote_average`}>Average User Score</option>
              <option value={`first_air_date`}>First Air Date</option>
            </select>
          </label>
        </section>
        <hr className="border-none h-[1px] bg-gray-400 dark:bg-gray-600" />
      </div>
      {/* CARD CONTAINER */}
      <section className="flex flex-wrap justify-center">
        {!isLoading &&
          !isError &&
          data.results.map((contentRes) => (
            <PosterCard key={contentRes.id} contentResource={contentRes} mediaType={mediaType} />
          ))}
      </section>
    </>
  )
}

export default Page
