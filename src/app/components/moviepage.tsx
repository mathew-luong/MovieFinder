import Link from "next/link";
import Image from "next/image";
import { MdStarRate } from "react-icons/md";
import { AiFillYoutube, AiOutlineCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { SimilarMoviesBtn } from "./similarmoviesbtn";
import FavouriteBtn from "./favouritebtn";

interface MovieProp {
    title: string;
    rating: string;
    releaseDate: string;
    runtime: string;
    overview: string;
    genres: string[];
    imgPath: string;
    trailerUrl: string;
    simMoviesArr: string[];
    id: number;
}

export function MoviePage(props: MovieProp) {
    // Get movie data from props
    const title = props.title;
    const rating = props.rating;
    const releaseDate = props.releaseDate;
    const runtime = props.runtime;
    const overview = props.overview;
    const genres = props.genres;

    // Includes link to movie poster (hosted on TMDB)
    const imgPath = props.imgPath;
    // Includes YouTube link to trailer
    const trailerUrl = props.trailerUrl;
    // Array of similar movies
    const simMoviesArr = props.simMoviesArr;

    return (
        <div className="flex flex-col gap-4 mt-20 md:my-10 lg:gap-8 lg:flex-row">
            <Image
                src={imgPath}
                width={500}
                height={750}
                alt="Thumbnail"
                className="mx-auto mb-4 rounded-xl max-h-[750px] xl:min-h-[500px] xl:w-auto lg:px-0 drop-shadow-xl dark:drop-shadow-none"
                priority={true}
            ></Image>
            <div className="pb-8 w-[100%] sm:w-[90%] lg:w-[70%] mx-auto">
                <h1 className="mb-4 text-2xl font-bold dark:text-white">
                    {title}
                </h1>
                <div className="flex flex-wrap gap-4 mb-6">
                    {genres.map((g: any) => {
                        return (
                            <h2
                                key={g}
                                className="text-gray-500 dark:text-gray-400 text-md"
                            >
                                {g}
                            </h2>
                        );
                    })}
                </div>
                <div className="w-[100%] flex flex-wrap mb-6 gap-4 sm:gap-8">
                    <h3 className="flex dark:text-white">
                        <MdStarRate
                            size="24"
                            className="mr-2 align-middle text-redtheme"
                        />
                        {rating}
                    </h3>
                    <h3 className="flex dark:text-white">
                        <AiOutlineCalendar
                            size="24"
                            className="mr-2 align-middle text-redtheme"
                        />
                        {releaseDate}
                    </h3>
                    <h3 className="flex dark:text-white">
                        <BiTime
                            size="24"
                            className="mr-2 align-middle text-redtheme"
                        />
                        {runtime}
                    </h3>
                </div>
                <p className="mb-8 dark:text-white">{overview}</p>
                <div className="flex flex-wrap w-full gap-4 mb-16">
                    <FavouriteBtn
                        id={props.id}
                        title={props.title}
                        rating={props.rating}
                        releaseDate={props.releaseDate}
                        runtime={props.runtime}
                        overview={props.overview}
                        genres={props.genres}
                        imgPath={props.imgPath}
                        trailerUrl={props.trailerUrl}
                        simMoviesArr={props.simMoviesArr}
                    />
                    {/* Show Trailer button if the trailer is found */}
                    <a
                        href={trailerUrl}
                        target="_blank"
                        className=" text-redtheme dark:text-white btn hover:text-white"
                        style={
                            trailerUrl !== ""
                                ? { display: "inline-flex" }
                                : { display: "none" }
                        }
                    >
                        <AiFillYoutube size={20} className="self-center mr-2" />
                        <p>watch the trailer</p>
                    </a>
                </div>

                {/* Display heading if this movie has at least one similar movie */}
                {simMoviesArr && simMoviesArr.length !== 0 && (
                    <h3 className="mb-4 text-lg font-bold dark:text-white">
                        Similar Movies
                    </h3>
                )}
                <div className="flex flex-wrap gap-4">
                    {simMoviesArr &&
                        simMoviesArr.map(
                            (simMovie: any, index: number) =>
                                // Limit 3 similar movies
                                index < 3 && (
                                    <SimilarMoviesBtn
                                        title={simMovie.title}
                                        id={simMovie.id}
                                        key={simMovie.id}
                                    />
                                )
                        )}
                </div>
            </div>
        </div>
    );
}
