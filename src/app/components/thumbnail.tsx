import Image from "next/image";
import Link from "next/link";
import posterImg from "../../../public/images/NoImg.png";
import { useRouter } from "next/navigation";

function getMovieGenre(id: number): string {
    type genres = {
        [key: number]: string;
    };

    const genres = {
        37: "Western",
        10752: "War",
        53: "Thriller",
        10770: "TV Movie",
        878: "Science Fiction",
        10749: "Romance",
        9648: "Mystery",
        10402: "Music",
        27: "Horror",
        36: "History",
        14: "Fantasy",
        10751: "Family",
        18: "Drama",
        99: "Documentary",
        80: "Crime",
        35: "Comedy",
        16: "Animation",
        12: "Adventure",
        28: "Action",
    };
    if (id in genres) {
        return genres[id as keyof typeof genres];
    } else {
        return "N/A";
    }
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
    movie: object;
}

export function Thumbnail({ movie }: { movie: MovieProp }) {
    const movieGenre = getMovieGenre(movie.genre_ids[0]);
    const id: number = movie.id;

    // If the movie doesn't have a poster img, set it to a default img
    let imgPath: any = "";
    movie.poster_path == null
        ? (imgPath = posterImg)
        : (imgPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

    return (
        // Link to movie page containing all the movie details /movies/movieId
        <Link
            href={`/movies/${id}`}
            className="flex flex-col mb-8 group"
            prefetch={false}
        >
            <Image
                src={imgPath}
                width={500}
                height={750}
                alt="Thumbnail"
                className="mb-4 rounded-xl drop-shadow-xl dark:drop-shadow-none"
            ></Image>
            <h1 className="dark:text-white text-l font-bold truncate max-w-[90%] group-hover:text-redtheme transition-all ease-linear duration-100">
                {movie.title}
            </h1>
            <h2 className="text-sm text-left text-gray-400">{movieGenre}</h2>
        </Link>
    );
}
