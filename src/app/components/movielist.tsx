import { Gridlayout } from "@/app/components/gridlayout";
import { Thumbnail } from "@/app/components/thumbnail";

interface MovieProp {
    movies: Array<object>;
}

export function MovieList(props: MovieProp) {
    let movies = props.movies;

    return (
        <Gridlayout>
            {movies.map((movie: any) => {
                // Only return movies with a poster
                return (
                    movie.poster_path !== null &&
                    movie.popularity > 1 && (
                        <Thumbnail key={movie.id} movie={movie} />
                    )
                );
            })}
        </Gridlayout>
    );
}
