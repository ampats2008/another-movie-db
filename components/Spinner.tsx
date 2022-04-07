// import * as React from "react"

export const Spinner = () => {
  const RADIUS = 45

  // Test the Helper function with this snippet
  // React.useEffect(() => {
  //     console.log('90%', getDashValue(95,RADIUS))
  //     console.log('5%', getDashValue(5,RADIUS))
  // }, []);

  return (
    <>
      <section className="grid place-items-center h-[60vh]">
        <svg
          className="h-20 w-20 stroke-indigo-600 dark:stroke-indigo-400 animate-spin"
          viewBox="0 0 100 100"
        >
          <circle
            className="animate-Spinner"
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={getDashValue(100, RADIUS)}
            strokeDashoffset={getDashValue(100, RADIUS)}
          />
        </svg>
      </section>
    </>
  )
}

//helper to calculate strokeDashArray/Offset Values
const getDashValue = (desiredPercentageAsInt: number, RADIUS: number) => {
  // Using $radius, calculate circumference.
  const circumference = 2 * Math.PI * RADIUS

  // Convert percentage to decimal.
  // i.e. 50% = 0.5.
  const percentageAsDecimal = desiredPercentageAsInt / 100

  // Return unit value.
  return circumference * percentageAsDecimal
}
