import { useRouter } from "next/router"
import { useRef, useState } from "react"

function useMovieTVSearch() : [string, React.Dispatch<React.SetStateAction<string>>, React.FormEventHandler, React.Ref<HTMLInputElement>] {
  //Landing Search Component
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const router = useRouter()

  const handleSearch: React.FormEventHandler = (e) => {
    e.preventDefault()
    router.push(`/search/${searchTerm}`)
  }

  return [searchTerm, setSearchTerm, handleSearch, searchInputRef]
} 

export default useMovieTVSearch
