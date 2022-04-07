import * as React from "react"
import Image from "next/image"
import ScoreMeter from "./ScoreMeter"
import { useRouter } from "next/router"

type Props = {
  contentResource: {
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
}

const PosterCard: React.FC<Props> = ({ contentResource }) => {
  const {
    backdrop_path,
    first_air_date,
    genre_ids,
    id,
    name,
    origin_country,
    original_language,
    original_name,
    overview,
    popularity,
    poster_path,
    vote_average,
    vote_count,
  } = contentResource

  const router = useRouter()

  const goToShowPage: React.MouseEventHandler = (e) => {
    e.preventDefault()
    router.push(`/shows/${contentResource.id}`)
  }

  return (
    <div
      id="card"
      className="m-10 w-min rounded-lg transition-all ease-out hover:scale-[1.05] cursor-pointer drop-shadow-md hover:drop-shadow-2xl will-change-[filter]"
      onClick={goToShowPage}
    >
      <div id="posterCont" className="w-[200px] h-[300px] relative">
        {poster_path ? (
          <Image
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`${name}`}
            title={`${name}`}
            priority
          />
        ) : (
          <div className="bg-gray-400 dark:bg-gray-600 absolute top-0 bottom-0 left-0 right-0 rounded-lg grid place-items-center">
            <p className=" m-0 p-0 text-xl font-bold text-center">{name}</p>
          </div>
        )}

        {vote_average && <ScoreMeter vote_average={vote_average!} />}
      </div>
    </div>
  )
}

export default PosterCard
