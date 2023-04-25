import Image from "next/image";
import { Gridlayout } from "@/app/components/gridlayout";
import { Thumbnail } from "@/app/components/thumbnail";
import headerpic from "../../public/images/homeHeader.jpg";
import type { Metadata } from "next";
import { SearchBtn } from "@/app/components/searchbtn";
import RandomMovieBtn from "@/app/components/randommoviebtn";
import getCurrUser from "./libs/session";

export const metadata: Metadata = {
    title: "Home | Movie Finder",
    description:
        "Movie Finder is an application designed to help you find what to watch!",
};

async function getPopularMovies() {
    // Revalidate every 12 hours (43200 seconds)
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&region=CA`,
        { next: { revalidate: 43200 } }
    );
    const data = await res.json();
    return data;
}

interface PopMovies {
    results: Array<object>;
}

// Homepage, shows most popular movies
export default async function Home() {
    const popMovies: PopMovies = await getPopularMovies();

    // Get the currently logged in user (if it exists)
    let currUser = await getCurrUser();

    return (
        <div className="flex p-6 sm:p-8 flex-column sm:w-full sm:h-screen">
            <div className="w-full">
                {currUser && (
                    <h1 className="mb-6 text-2xl font-bold">
                        Hello, {currUser.username}
                    </h1>
                )}
                <div className="relative w-full mb-8">
                    <Image
                        src={headerpic}
                        placeholder="blur"
                        className="object-cover object-left w-full h-64 mx-auto rounded-xl drop-shadow-xl dark:drop-shadow-none"
                        alt="Image"
                        priority={true}
                    />
                    <h1 className="absolute text-3xl font-bold text-white left-4 top-4 md:left-8 md:top-8">
                        Home |
                    </h1>
                    <div className="absolute text-white bottom-4 sm:bottom-0 left-4 md:left-6 md:bottom-6">
                        <SearchBtn />
                    </div>
                </div>
                <div className="flex flex-col flex-wrap items-start gap-4 mt-3 mb-6 align-middle">
                    <span className="text-2xl font-bold dark:text-white">
                        Don&apos;t know what to watch?
                    </span>
                    <RandomMovieBtn />
                </div>
                <h1 className="mb-8 text-2xl font-bold dark:text-white">
                    Most Popular
                </h1>
                <Gridlayout>
                    {popMovies.results.map((movie: any) => {
                        return <Thumbnail key={movie.id} movie={movie} />;
                    })}
                </Gridlayout>
            </div>
        </div>
    );
}
