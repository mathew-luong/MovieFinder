import { MovieList } from "../components/movielist";

async function getNowPlayingMovies() {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&sort_by=popularity.desc&region=CA`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
}

async function getUpcomingMovies() {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&sort_by=popularity.desc&region=CA`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
}

async function getTopRatedMovies() {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&sort_by=popularity.desc&region=CA`,
        { cache: "no-store" }
    );
    const data = await res.json();
    return data;
}

interface SearchParams {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SortedMovies({ searchParams }: SearchParams) {
    let movies: any = null;

    // Get movie list according to sorting order
    if (searchParams.sortBy === "Top Rated") {
        movies = await getTopRatedMovies();
    } else if (searchParams.sortBy === "Upcoming Movies") {
        movies = await getUpcomingMovies();
    } else {
        // Default is Now Playing
        movies = await getNowPlayingMovies();
    }

    // Get list of movies
    let movieArr: Array<object> = movies.results;

    return (
        <div className="flex p-6 pt-0 sm:p-8 flex-column sm:w-full sm:h-screen">
            <div className="flex flex-col w-full">
                {/* Render sorted movie list */}
                <MovieList movies={movieArr} />
            </div>
        </div>
    );
}
