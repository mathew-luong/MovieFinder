import Image from "next/image";
import headerpic2 from "../../../public/images/moviesHeader.png";
import SortBtn from "./sortbtn";
import SortedMovies from "./sortedmovies";

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // For /products/123, params.id is "123"
    // For /products/123?color=black, searchParams.color is "black"
    // The return value is the metadata object
    return { title: "Movies | Movie Finder" };
}

interface SearchParams {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Movies({ searchParams }: SearchParams) {
    return (
        <div>
            <div className="relative w-full p-6 pb-0 sm:p-8">
                <Image
                    src={headerpic2}
                    className="object-cover object-right h-64 mx-auto rounded-xl drop-shadow-xl dark:drop-shadow-none"
                    alt="Image"
                    priority={true}
                />
                <h1 className="absolute text-3xl font-bold text-white left-12 bottom-6 md:left-16 md:top-16">
                    Movies |
                </h1>
            </div>
            <SortBtn />
            {/* @ts-expect-error Async Server Component */}
            <SortedMovies searchParams={searchParams} />
        </div>
    );
}
