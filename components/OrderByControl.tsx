import * as React from "react"

type Props = {
  sortBy: string
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  setSortDirection: React.Dispatch<React.SetStateAction<string>>
  btnDirClass: string
  mediaType: string
}

const OrderByControl: React.ForwardRefRenderFunction<
  SVGSVGElement | null,
  Props
> = (
  { sortBy, setSortBy, setPageIndex, setSortDirection, btnDirClass, mediaType },
  ref
) => {
  return (
    <>
      <label>
        Order by:
        <svg
          ref={ref}
          onClick={() => {
            setSortDirection((prevSortDir) =>
              prevSortDir === ".desc" ? ".asc" : ".desc"
            ) // toggle b/w ascending or descending
            setPageIndex(1) // reset to first page
          }}
          className={`h-8 w-8 inline-block mx-[15px] h-8 w-8 dark:text-indigo-400 dark:hover:text-indigo-300 text-indigo-600 hover:text-indigo-400 cursor-pointer transition-all ${btnDirClass}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
            clipRule="evenodd"
          />
        </svg>
        <select
          className="pagination-select dark:bg-slate-900 p-2 mt-7 lg:mt-auto"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value)
            setPageIndex(1)
          }}
        >
          <option value={`popularity`}>Popularity</option>
          <option value={`vote_average`}>Average User Score</option>
          {mediaType === "tv" ? (
            <option value={`first_air_date`}>First Air Date</option>
          ) : (
            <option value={`primary_release_date`}>Release Date</option>
          )}
        </select>
      </label>
    </>
  )
}

export default React.forwardRef(OrderByControl)
