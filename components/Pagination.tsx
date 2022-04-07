import * as React from "react"
import Image from "next/image"
import { UserIcon } from "@heroicons/react/outline"

type Props = {
  pageIndex: number
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<Props> = ({ pageIndex, setPageIndex }) => {
  const btnClass = "px-5 py-2 text-3xl bg-indigo-600 dark:bg-indigo-400 rounded-xl"

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
          &larr;
        </button>
        <p className="p-2">{pageIndex}</p>
        <button onClick={() => handlePageChange("next")} className={btnClass}>
          &rarr;
        </button>
      </div>
    </>
  )
}

export default Pagination
