import { useEffect } from "react"


function useFunctionOnTimer(fn:Function, args:any[] = [], mins: number): void {
  // Change background on interval
  const HALF_MIN_MS = 1000 * 10 * 6

  useEffect(() => {
    const interval = setInterval(() => {
        fn(...args)
    }, (HALF_MIN_MS * mins))

    return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
}

export default useFunctionOnTimer
