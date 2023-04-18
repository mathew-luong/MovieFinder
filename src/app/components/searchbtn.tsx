"use client";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

// Search button
export function SearchBtn() {
    // Search query
    const [searchString, setSearchString] = useState("");

    const router = useRouter();

    // Sets the search query keyword
    const handleSearchQueryBtn = (event: React.ChangeEvent) => {
        setSearchString((event.target as HTMLInputElement).value);
    };

    // Handles when a user searches for a movie by keywords
    const handleSearchFormBtn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchString === "") {
            return;
        }
        // Replace any spaces in the query with encoded %20
        let query = searchString.replace(" ", "%20");
        let url = `/find/search?keywords=${query}`;
        setSearchString("");
        // Reroute the user to their search query results page (server side)
        router.push(url);
    };

    return (
        // Back button (displays only on md screens and larger)
        <div className="flex w-full py-2 hover:text-slate-300 ">
            <form
                action=""
                className="relative mx-auto w-max"
                onSubmit={handleSearchFormBtn}
            >
                <input
                    type="search"
                    onChange={handleSearchQueryBtn}
                    value={searchString}
                    aria-label="Search Input"
                    placeholder="Search for a movie"
                    className="relative z-10 w-16 h-12 pr-0 placeholder-white hover:text-white transition-all duration-200 ease-linear bg-transparent border-0 rounded-full outline-none cursor-pointer pl-16 peer focus:border-2 focus:w-[90%] focus:cursor-text focus:border-white focus:pl-12 focus:pr-4"
                />
                <BiSearch
                    size={32}
                    className="absolute inset-y-0 w-12 h-8 mx-auto my-auto"
                />
            </form>
        </div>
    );
}
