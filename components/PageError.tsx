import { ExclamationIcon } from "@heroicons/react/solid"

export const PageError = (error: any) => {
  console.log(error)

  return (
    <>
      <section className="grid place-items-center h-[60vh]">
        <h2 className="text-2xl">
          <ExclamationIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-300 inline mr-4" />
          Sorry, we&apos;re having trouble connecting to{" "}
          <a
            className="hover:underline text-indigo-600 dark:text-indigo-300"
            href="https://www.themoviedb.org/?language=en-US"
            target="_blank"
            rel="noreferrer"
          >
            tMDB
          </a>{" "}
          at the moment. Please try again later.
        </h2>
      </section>
    </>
  )
}
