import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function useGetTVShows(id) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
