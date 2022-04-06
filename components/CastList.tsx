import * as React from "react"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/outline"

type Props = {
  contentID: number
  seasonNum?: number
  episodeNum?: number
}

type CastMember = {
  adult: boolean
  gender: number
  id: number
  known_for_department: Department
  name: string
  original_name: string
  popularity: number
  profile_path: null | string
  character?: string
  credit_id: string
  order?: number
  job?: string
  department?: Department
}

export enum Department {
  Acting = "Acting",
  Directing = "Directing",
  Writing = "Writing",
}

const CastList: React.FC<Props> = ({ contentID, seasonNum, episodeNum }) => {
  const [castList, setCastList] = React.useState<CastMember[]>([])
  const [loaded, setLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    // call for cast list
    getCastList(contentID, seasonNum, episodeNum).then((res) => {
      setCastList(res)
      setLoaded(true)
    })
  }, [])

  const getCastList = async (
    content_id: number,
    season_number: number | undefined,
    episode_number: number | undefined
  ) => {
    // default to Movie castlist request URL
    let castListURL = `https://api.themoviedb.org/3/movie/${content_id}/credits?api_key=b266704b1a8e284b85f455fc1050f942&language=en-US`

    // if we are retrieving a tv show's castlist, change the URL
    if (season_number !== undefined && episode_number !== undefined)
      castListURL = `https://api.themoviedb.org/3/tv/${content_id}/season/${season_number}/episode/${episode_number}/credits?api_key=b266704b1a8e284b85f455fc1050f942&language=en-US`

    const res = await fetch(castListURL)
    const data = await res.json()

    // if resource could not be found, return empty array
    if (res.status === 404 || data.results?.length === 0) return []

    // otherwise, return the resulting cast list
    return data.cast
  }

  return (
    <div className="mx-auto mt-10 max-h-[500px] overflow-y-auto sm:w-full flex flex-wrap gap-10 sm:flex-nowrap sm:overflow-x-auto">
      {loaded
        ? castList.map((actor) => (
            // Actor Card
            <div
              key={actor.name}
              id="actorCard"
              className="w-[175px] bg-gray-100 dark:bg-slate-700 rounded-lg my-4 drop-shadow-sm"
            >
              {actor.profile_path ? (
                // Actor's Headshot:
                <div
                  id="headshotCont"
                  className="w-[175px] h-[290.5px] relative"
                >
                  <Image
                    className="rounded-t-lg"
                    layout="fill"
                    objectFit="cover"
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    priority
                  />
                </div>
              ) : (
                // Placeholder Headshot:
                <div
                  id="placeHolderHeadshotCont"
                  className="w-[175px] h-[290.5px] bg-gray-400 dark:bg-gray-600 rounded-t-lg"
                >
                  <UserIcon className="text-[#949ba6] dark:text-gray-500 pt-10 p-5" />
                </div>
              )}

              <div id="actorDesc" className="p-4">
                <p className="font-semibold">{actor.name}</p>
                <p className="italic">{actor.character}</p>
              </div>
            </div>
          ))
        : // If component data hasn't loaded yet, display these placeholder cards instead:
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((actor) => (
            <div
              key={`actorPlaceHolderCard-${actor}`}
              id="actorCard"
              className="w-[175px] bg-gray-100 dark:bg-gray-700 rounded-lg my-4 drop-shadow-sm"
            >
              <div
                id="placeHolderHeadshotCont"
                className="w-[175px] h-[290.5px] bg-gray-400 dark:bg-gray-600 rounded-t-lg"
              >
                <UserIcon className="text-[#949ba6] dark:text-gray-500 pt-10 p-5 animate-pulse" />
              </div>
              <div id="actorDesc" className="p-4">
                <div
                  id="placeholder_text"
                  className="h-3 w-full bg-[#949ba6] dark:bg-gray-500  rounded-full animate-pulse"
                ></div>
                <div
                  id="placeholder_text"
                  className="h-3 w-[70%] bg-[#949ba6] dark:bg-gray-500 rounded-full mt-3 animate-pulse"
                ></div>
              </div>
            </div>
          ))}
    </div>
  )
}

export default CastList
