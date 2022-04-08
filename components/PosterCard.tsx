import * as React from "react"
import Image from "next/image"
import ScoreMeter from "./ScoreMeter"
import { useRouter } from "next/router"

type Props = {
  mediaType: string
  contentResource:
    | {
        id: number
        name: string
        poster_path: string
        vote_average: number
      }
    | {
        id: number
        title: string
        poster_path: string
        vote_average: number
      }
}

const PosterCard: React.FC<Props> = ({ mediaType, contentResource }) => {
  const { id, name, title, poster_path, vote_average } = contentResource

  const contentName = name ? name : title

  const router = useRouter()

  const goToShowOrMoviePage: React.MouseEventHandler = (e) => {
    e.preventDefault()

    router.push(`/${mediaType === "tv" ? "shows" : "movies"}/${id}`)
  }

  return (
    <div
      id="card"
      className="m-10 w-min rounded-lg transition-all ease-out hover:scale-[1.05] cursor-pointer drop-shadow-md hover:drop-shadow-2xl will-change-[filter]"
      onClick={goToShowOrMoviePage}
    >
      <div id="posterCont" className="w-[200px] h-[300px] relative">
        {poster_path ? (
          <Image
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`${contentName}`}
            title={`${contentName}`}
            priority
          />
        ) : (
          <div className="bg-gray-400 dark:bg-gray-600 absolute top-0 bottom-0 left-0 right-0 rounded-lg grid place-items-center">
            <p className=" m-0 p-0 text-xl font-bold text-center">
              {contentName}
            </p>
          </div>
        )}

        {vote_average && <ScoreMeter vote_average={vote_average!} />}
      </div>
    </div>
  )
}

export default PosterCard
