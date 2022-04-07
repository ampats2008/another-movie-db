import useSWR from "swr"

type Args = {
  pageIndex: number
  sortBy: string
  fallbackData: any
}

function useGetTVShows({ pageIndex, sortBy, fallbackData }: Args) {
  const API_KEY = "b266704b1a8e284b85f455fc1050f942"
  const apiURL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageIndex}&with_watch_monetization_types=flatrate`
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error } = useSWR(apiURL, fetcher, { fallbackData })

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useGetTVShows
