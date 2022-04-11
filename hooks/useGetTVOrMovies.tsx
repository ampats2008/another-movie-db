import useSWR from "swr"

type Args = {
  mediaType: string,
  pageIndex: number
  sortBy: string
  fallbackData: any
}

function useGetTVOrMovies({ mediaType, pageIndex, sortBy, fallbackData }: Args) {
  const apiURL = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=b266704b1a8e284b85f455fc1050f942&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&with_original_language=en&first_air_date.gte=1950-01-01&primary_release_date.gte=1950-01-01&vote_average.gte=2&page=${pageIndex}&with_watch_monetization_types=flatrate`
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error } = useSWR(apiURL, fetcher, { fallbackData })

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useGetTVOrMovies
