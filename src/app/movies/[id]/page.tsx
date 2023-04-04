import { BackBtn } from "../../components/backbtn";
import posterNoImg from "../../../../public/images/NoImg.png";
import { MoviePage } from "@/app/components/moviepage";
import type { Metadata } from "next";

function getGenres(genres: Array<any>): string[] {
    if (genres == null) {
        return [""];
    }

    let str: string[] = [];
    // Build string of genres e.g. str = horror | comedy | thriller
    for (let genre of genres) {
        str.push(genre.name.toLowerCase());
    }

    return str;
}

function getRuntime(runtime: number): string {
    if (runtime == null || runtime == 0) {
        return "N/A";
    }
    let hrs = runtime / 60;
    let mins = runtime % 60;

    return Math.floor(hrs) + "h " + mins + "m";
}

function getRating(rating: number): string {
    if (rating == 0.0 || rating == null) {
        return "N/A";
    }
    let rounded = rating.toFixed(1);
    return rounded.toString() + "/10";
}

// Returns the YouTube URL of a trailer for the associated movie
function getMovieTrailer(videos: Array<any>): string {
    if (videos == null) {
        return "";
    }

    let url = "https://www.youtube.com";

    for (let i = 0; i < videos.length; i++) {
        // Search for a trailer from youtube and append its key to the url
        if (videos[i].type === "Trailer" && videos[i].site === "YouTube") {
            url += "/watch?v=" + videos[i].key;
            return url;
        }
    }
    return "";
}

// Returns an object containing the first page of similar movies (result in array: response.results)
async function getSimilarMovies(movieId: number) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    );
    const simMovies = await res.json();
    return simMovies;
}

// Get a list of videos associated with a movie, used to find the movie trailer
async function getVideos(movieId: number) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    const videos = await res.json();
    return videos;
}

// Returns an object containing details of the specified movieId
async function getMovie(movieId: number) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    const movie = await res.json();
    return movie;
}

// Set name of page
export async function generateMetadata({ params }: any): Promise<Metadata> {
    // Fetch response is cached from component below (only 1 fetch request)
    const movie = await getMovie(params.id);
    return { title: movie.title + " | Movie Finder" };
}

interface MovieProp {
    title: string;
    id: number;
    rating: string;
    releaseDate: string;
    runtime: string;
    overview: string;
    genres: string[];
    imgPath: string;
    trailerUrl: string;
    simMoviesArr: string[];
    genre_ids: number[];
    poster_path: string;
}

export default async function Page({ params }: { params: MovieProp }) {
    // Retrieve the specific  movie (on error redirects to error.tsx)
    const movie = await getMovie(params.id);

    // Retrieve similar movies based on keywords (on error redirects to error.tsx)
    const similarMovies = await getSimilarMovies(movie.id);
    const simMoviesArr = similarMovies.results;

    // Get trailer url for this movie (on error redirects to error.tsx)
    const vids = await getVideos(movie.id);
    const trailerUrl = getMovieTrailer(vids.results);

    // Get genres, runtime, rating for this movie
    const genres = getGenres(movie.genres);
    const runtime = getRuntime(movie.runtime);
    const rating = getRating(movie.vote_average);

    // Create the image path for the movie poster, if it has one, otherwise no img
    let imgPath: any = "";
    movie.poster_path == null
        ? (imgPath = posterNoImg)
        : (imgPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

    return (
        <div className="flex flex-column sm:w-[100%] sm:h-screen px-8 md:p-8 mx-auto">
            <div className="w-[100%] flex 2xl:p-8 pt-0 md:pt-8">
                {/* Client rendered back button */}
                <BackBtn />
                {/* Render Movie Page Component */}
                <MoviePage
                    imgPath={imgPath}
                    genres={genres}
                    overview={movie.overview}
                    runtime={runtime}
                    trailerUrl={trailerUrl}
                    simMoviesArr={simMoviesArr}
                    releaseDate={movie.release_date}
                    rating={rating}
                    title={movie.title}
                />
            </div>
        </div>
    );
}
