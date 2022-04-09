import { useState } from "react"
import PosterCard from "../components/PosterCard"
import { MovieResult } from "../pages/movies"
import { TVResult } from "../pages/shows"

type Props = {
  cards: TVResult[] | MovieResult[]
  mediaType: string
}

const HomePageCardContainer = ({ cards, mediaType }: Props) => {
  // control state of slice / show more button here

  const [shownCardLimit, setShownCardLimit] = useState<number>(6)

  return (
    <>
      <section className="flex flex-wrap justify-center">
        {cards.slice(0, shownCardLimit).map((contentRes) => (
          <PosterCard
            key={contentRes.id}
            contentResource={contentRes}
            mediaType={mediaType}
          />
        ))}
      </section>
      {(shownCardLimit < cards.length) &&
        <div className="grid place-items-center my-10">
          <button
            onClick={() =>
              setShownCardLimit((prevCount) =>
                prevCount < cards.length ? prevCount + 6 : prevCount
              )
            }
            className="py-2 px-4 rounded-full drop-shadow-sm transition-colors bg-indigo-600 border-indigo-600 border text-gray-300 hover:text-indigo-600 hover:bg-transparent dark:hover:bg-transparent dark:bg-indigo-400  dark:border-indigo-400 dark:text-slate-900 dark:hover:text-indigo-400"
          >
            Show more
          </button>
        </div>
      }
    </>
  )
}

export default HomePageCardContainer
