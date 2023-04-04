import icon from "../../../public/images/TMDB.svg";
import Image from "next/image";
import type { Metadata } from "next";
import header from "../../../public/images/aboutHeader.jpg";

export const metadata: Metadata = {
    title: "About | Movie Finder",
    description: "",
};

// Staticly generated (SSG)
export default async function Page() {
    return (
        <div className="flex flex-column sm:w-[100%] sm:h-screen p-8">
            <div className="w-full">
                <div className="relative w-full">
                    <Image
                        src={header}
                        className="object-cover object-right h-64 mx-auto rounded-xl drop-shadow-xl dark:drop-shadow-none"
                        alt="Image"
                        priority={true}
                    />
                    <h1 className="absolute text-3xl font-bold text-white left-4 top-4 md:left-8 md:top-8">
                        About |
                    </h1>
                </div>
                {/* <h1 className="text-2xl text-white">About Movie Finder</h1> */}
                <div className="w-full my-3 mt-6 dark:text-white">
                    <h1 className="mb-3 text-2xl font-bold dark:text-white">
                        What is Movie Finder
                    </h1>
                    <p className="text-gray-600 dark:text-white">
                        Welcome to Movie Finder, your one-stop destination for
                        discovering new movies and exploring your favorite
                        genres! Our app allows you to find random movies, browse
                        movies that are currently playing, discover top-rated
                        films, and explore the most popular titles. With our
                        powerful search and filtering options, you can quickly
                        and easily find the movies that interest you most.
                    </p>
                    <p className="mt-3 text-gray-600 dark:text-white">
                        It was created using Next.js with TypeScript and SWR,
                        making it fast, responsive, and easy to use. It is
                        stylized with Tailwind CSS, Material UI (MUI), React
                        Icons, and Next Themes. This combination of powerful
                        tools and intuitive design makes Movie Finder the
                        perfect app for anyone who loves movies.
                    </p>
                    <h1 className="mt-6 mb-3 text-2xl font-bold dark:text-white">
                        Created By
                    </h1>
                    <a
                        href="https://mathew-luong.github.io/"
                        className="text-gray-600 transition-all ease-linear hover:font-bold dark:text-white"
                    >
                        mathew-luong.github.io
                    </a>
                    <h1 className="mt-6 text-2xl font-bold dark:text-white">
                        Attribution
                    </h1>
                </div>
                <div className="flex flex-row flex-wrap gap-6">
                    <p className="text-gray-600 dark:text-white">
                        Movie Finder uses the TMDB API but is not endorsed or
                        certified by TMDB.
                    </p>
                    <a href="https://www.themoviedb.org/">
                        <Image
                            src={icon}
                            width="0"
                            height="0"
                            className="w-auto h-6"
                            alt="TMDB Logo"
                            priority={true}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
