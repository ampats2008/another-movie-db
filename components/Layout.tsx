import * as React from "react"
import { useRef } from "react"
import Head from "next/head"
// import styles from '../styles/Layout.module.css'
import Link from "next/link"
import { useRouter } from "next/router"

// heroicons
import { HomeIcon } from "@heroicons/react/outline"
import { FilmIcon } from "@heroicons/react/outline"
import { DesktopComputerIcon } from "@heroicons/react/outline"
import { UsersIcon } from "@heroicons/react/outline"
import { CollectionIcon } from "@heroicons/react/outline"
import { SearchIcon } from "@heroicons/react/outline"
import { DatabaseIcon } from "@heroicons/react/solid"

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = React.useState<string>("")

  const router = useRouter()

  const handleSearch: React.FormEventHandler = (e) => {
    e.preventDefault()
    router.push(`/search/${searchTerm}`)
  }

  React.useEffect(() => {
    document.getElementsByTagName("html")[0].classList.add("dark") // for dev purposes
  }, [])

  return (
    <>
      <Head>
        <title>Another Movie DB</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id={"layoutGrid"} className={""}>
        <header
          className={
            "bg-gray-200 dark:bg-slate-900 dark:text-gray-200 flex flex-wrap justify-center xl:justify-between"
          }
        >
          <div id="logoCont">
            <Link href="/">
              <a className="px-10 my-10 flex items-center justify-center transition-opacity hover:opacity-80">
                <h1 className="text-5xl font-bold">Another Movie DB</h1>
                <DatabaseIcon
                  className={
                    "inline ml-3 h-14 w-14 text-indigo-900 dark:text-indigo-400"
                  }
                />
              </a>
            </Link>
          </div>
          <nav className="sm:w-full my-2 max-w-screen-lg sm:flex flex-wrap">
            <NavLink name="Home" />
            <NavLink name="Movies" />
            <NavLink name="TV" />
            <NavLink name="People" />
            <NavLink name="Genres" />

            <div className="group sm:min-w-[7rem] px-1 m-auto rounded-full bg-gray-300 dark:bg-slate-700 drop-shadow-sm">
              <form onSubmit={handleSearch} className="flex h-7 items-center">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  ref={searchInputRef}
                  type={"text"}
                  className="h-full w-[85%] pl-2 justify-self-start rounded-full border-none focus:outline-none bg-gray-300 dark:bg-slate-700"
                  placeholder="Find a movie or show..."
                />
                <a href="#" onClick={handleSearch} className="mx-auto">
                  <SearchIcon
                    className={
                      "h-5 w-5 transition-colors text-indigo-600 hover:text-indigo-400  dark:text-indigo-400 dark:hover:text-indigo-300"
                    }
                  />
                </a>
              </form>
            </div>
          </nav>
        </header>
        <main className={"min-h-[100vh]"}>{children}</main>
        <footer
          className={"bg-gray-200 dark:bg-slate-900 p-10 text-center mt-10"}
        >
          Copyright &#169; 2022 Anthony Medugno.
        </footer>
      </div>
    </>
  )
}

export default Layout

type NavLinkProps = {
  name: string
}

type className = string // used to trick tailwindcss extension into providing intellisense for string of classnames

const NavLink: React.FC<NavLinkProps> = ({ name }) => {
  // href default
  let link = `/${name.toLowerCase()}`

  // href for special cases
  if (name === "Home") link = "/"
  if (name === "Search") link = "#"
  if (name === "TV") link = "/shows"

  const iconClass: className =
    "inline h-6 w-6 text-indigo-600 dark:text-indigo-400 translate-x-10 rotate-0 transition-transform ease-in-out duration-500 group-hover:translate-x-0 group-hover:rotate-[360deg] relative z-[1]"

  const iconMap: { [name: string]: JSX.Element } = {
    Home: <HomeIcon className={iconClass} />,
    Movies: <FilmIcon className={iconClass} />,
    TV: <DesktopComputerIcon className={iconClass} />,
    People: <UsersIcon className={iconClass} />,
    Genres: <CollectionIcon className={iconClass} />,
    Search: <SearchIcon className={iconClass} />,
  }

  return (
    <>
      <Link href={link}>
        <a className="group sm:min-w-[7rem] px-1 my-4 mx-auto flex items-center relative">
          {iconMap[name]} {/* hero icon goes here */}
          <span
            className="
                ml-2
                invisible group-hover:visible 
                opacity-0 transition-all duration-500 group-hover:opacity-100 
                -translate-x-1/2 group-hover:translate-x-0 relative"
          >
            {name}
          </span>
        </a>
      </Link>
    </>
  )
}
