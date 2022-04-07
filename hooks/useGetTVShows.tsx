import useSWR from "swr"

type Args = {
  pageIndex: number,
  initialData : Object,
}

function useGetTVShows({ pageIndex, initialData }: Args) {
  const API_KEY = 'b266704b1a8e284b85f455fc1050f942'
  const apiURL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageIndex}&with_watch_monetization_types=flatrate`
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  
  const { data, error } = useSWR(apiURL, fetcher, {initialData})

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useGetTVShows