import * as React from "react"
import { ArrowCircleRightIcon, ArrowCircleLeftIcon } from '@heroicons/react/solid'

type Props = {
  pageIndex: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<Props> = ({ pageIndex, setPageIndex }) => {
  const btnClass = "transition-colors text-indigo-600 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"

  const handlePageChange = (direction: string) => {
    if (direction === "prev") {
      setPageIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : prevIndex))
    } else {
      setPageIndex((prevIndex) => prevIndex + 1)
    }
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div id="pagination" className="flex flex-nowrap gap-5 justify-center">
        {/* for setPageIndex, if the current page is 1, keep it the same*/}
        <button onClick={() => handlePageChange("prev")} className={btnClass}>
          <ArrowCircleLeftIcon className="h-10 w-10"/>
        </button>
        <span className="p-2 text-xl text-indigo-600 dark:text-indigo-300">{pageIndex}</span>
        <button onClick={() => handlePageChange("next")} className={btnClass}>
          <ArrowCircleRightIcon className="h-10 w-10"/>
        </button>
      </div>
    </>
  )
}

export default Pagination
