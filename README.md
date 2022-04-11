# Another Movie Database (AMDb)

This web app allows you to view some basic info about movies / TV shows. It was built using [TMDB's](https://www.themoviedb.org/?language=en-US) public developer API.

## Tools overview
- Next.js
- useSWR
- My Custom Hooks
- TypeScript
- TailwindCSS

### Next.js
This was my first time using Next.js, and I enjoyed using its built-in features that React doesn't provide on its own:
- *next-router* - for creating dynamic / static routes
- *getServerSideProps* - for fetching initial page data.
- `<Image />` - for optimizing images fetched from the API.

### useSWR
I used this custom hook by Vercel to simplify my CSR code on the */shows* and */movies* pages. I used it to create a custom hook, *useGetTVOrMovies.tsx*, which would fetch the data for `<Page />` and refetch the data if necessary. In my case, it allowed me to easily implement pagination, error handling, and loading state; however, it also provides more built-in features / optimizations which I haven't explored yet. See the [useSWR website](https://swr.vercel.app/) for more information.

### My Custom Hooks
For this project, I created a couple custom hooks to make my code cleaner and to make my logic reusable for future projects. Here are a couple of them:
- *useFunctionOnTimer(Function, FnArgs[], Mins)* - This hook takes a function, an array of its arguments, and a time interval in minutes. It will execute the function on every pass of the time interval. It's pretty simple, but it allows you to remove a fairly sizeable useEffect block from your code.
- *useMovieTVSearch()* - This hook provides the logic behind any search bar created on my app (there are two of them). It returns a piece of state (searchTerm, setSearchTerm), a ref to the search bar (searchInputRef), and a FormSubmit-EventHandler (handleSearch). This hook allowed me to display two visually distinct search bars in two different components, but have them behave the exact same way. 

I'm going to keep making these types of hooks since it makes your code much more expressive / readable in my opinion.

### TypeScript
I typed the data returned from the API throughout the application, which provided useful intellisense when creating components (like `<ScoreMeter />` and `<CastList />`).

### TailwindCSS
Tailwind made my CSS workflow much more efficient and made my code more reusable for future projects. The intellisense provided by the TailwindCSS VS Code extension made writing CSS (especially media queries!) much more enjoyable. Also, Tailwind's media queries require mobile-first design by default, so the CSS footprint of this app is much smaller than other desktop-first apps I've developed. Since my CSS is confined to each component's *.tsx file (with the exception of a couple global styles), it would be very easy to copy and reuse each component in this project.

Overall, I'm happy with how this project came out. I felt like the tools I chose for this app allowed me to work smarter, and I'll certainly be revisiting all of them in the future.
