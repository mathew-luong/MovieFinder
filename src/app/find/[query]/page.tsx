import { BackBtn } from "@/app/components/backbtn";
import { MovieList } from "@/app/components/movielist";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search | Movie Finder",
};

async function filterMovies(
    genres: string[],
    sortBy: string,
    releaseYear: string,
    certification: string
    // runtimeLT: string
) {
    // Encode genre array into comma separated genres  -> [100,400] = 100%2C400
    let genreQuery = genres.join("%2C");

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&include_adult=false
    &region=CA&include_video=false&with_release_type=5|4|3|2|1&with_watch_monetization_types=flatrate
    &sort_by=${sortBy}&page=1
    &with_genres=${genreQuery}`;
    // &with_runtime.lte=${runtimeLT}

    // Add specified release year
    if (releaseYear !== "null") {
        url += `&primary_release_year=${releaseYear}`;
    }
    // Add certification (G,PG,PG-14A,18A)
    if (certification !== "") {
        url += `&certification=${certification}&certification_country=CA`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function searchMovie(query: string) {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false
    &sort_by=popularity.desc&query=${query}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
}

interface Params {
    query: string;
}

interface SearchParams {
    keywords: string;
    sortBy: string;
    certification: string;
    releaseYr: string;
    genre: string;
}

// Search params is an object containing the search query info
// e.g. searchParams.genre, searchParams.keywords
export default async function Page({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: SearchParams;
}) {
    let movies = [];

    if (params.query === "filter") {
        // Get array of genres
        let genreArr = searchParams.genre.split(",");

        // Get the sort criteria from the query
        let sortBy = searchParams.sortBy;
        // Only include movies released this year
        let releaseYear = searchParams.releaseYr;
        // MPAA rating (could be "")
        let certification = searchParams.certification;
        // Upper bound for movie runtime
        // let runtimeLT = searchParams.withRuntimeLte;

        let queryResults = await filterMovies(
            genreArr,
            sortBy,
            releaseYear,
            certification
        );
        movies = queryResults.results;
    } else if (params.query === "search") {
        let queryResults = await searchMovie(searchParams.keywords);
        movies = queryResults.results;
    }

    return (
        <div className="flex flex-column sm:w-[100%] sm:h-screen p-6 sm:p-8">
            <div className="flex flex-col w-full">
                <BackBtn />
                <h1 className="flex flex-wrap mt-16 mb-8 text-2xl font-bold text-black dark:text-white">
                    Results
                    {searchParams.keywords
                        ? " for " + searchParams.keywords
                        : ""}
                </h1>
                {/* Render movie list on the client side */}
                {movies.length > 0 && <MovieList movies={movies} />}
                {movies.length === 0 && (
                    <div className="flex justify-center w-full h-full text-3xl align-middle">
                        <div className="self-center text-2xl">
                            No Results &#58;&#40;
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
