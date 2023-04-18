import { Gridlayout } from "@/app/components/gridlayout";
import { Thumbnail } from "@/app/components/thumbnail";

interface MovieProp {
    movies: Array<object>;
}

export function MovieList(props: MovieProp) {
    let movies = props.movies;

    return (
        <div className="grid grid-flow-row grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
            {movies.map((movie: any) => {
                // Only return movies with a poster
                return (
                    movie.poster_path !== null &&
                    movie.popularity > 1 && (
                        <Thumbnail key={movie.id} movie={movie} />
                    )
                );
            })}
        </div>
    );
}
