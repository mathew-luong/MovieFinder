"use client";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

// Genre followed by their id
const genreList = [
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Science Fiction", id: 878 },
    { name: "Thriller", id: 53 },
    { name: "TV Movie", id: 10770 },
    { name: "War", id: 10752 },
    { name: "Western", id: 37 },
];

export default function ClientForm() {
    // Array of genre filters set by the user
    const [genres, setGenres] = useState<number[]>([]);
    // Sorting filter, default is most popular
    const [sortBy, setSortBy] = useState("popularity.desc");
    // Release year filter
    const [releaseYear, setReleaseYear] = useState<number | null>(null);
    // Search query
    const [searchString, setSearchString] = useState<string>("");
    // Rating/certification
    const [certification, setCertification] = useState<string>("");

    // Used to route the user to the result of their query
    const router = useRouter();

    // Event Handlers ==================================================================

    // Set new sorting criteria
    const handleSortClick = (
        event: React.MouseEvent<HTMLElement>,
        sort: string
    ) => {
        setSortBy(sort);
    };

    // Add genre(s) selected by the user
    const handleGenreClick = (
        event: React.MouseEvent<HTMLElement>,
        newGenres: number[]
    ) => {
        setGenres(newGenres);
    };

    // Set release year criteria
    const handleDateClick = (event: React.ChangeEvent) => {
        setReleaseYear(Number((event.target as HTMLInputElement).value));
    };

    // Sets the search query keyword
    const handleSearchQueryBtn = (event: React.ChangeEvent) => {
        setSearchString((event.target as HTMLInputElement).value);
    };

    // Set the certification filter (G,PG,PG-13,R)
    const handleCertificationClick = (
        event: React.MouseEvent<HTMLElement>,
        cert: string
    ) => {
        setCertification(cert);
    };

    // Event Handlers ==================================================================

    // Handles when a user searches movies through filters
    const handleFilterBtn = () => {
        // User must search for at least one genre
        if (genres.length == 0) {
            alert("Please select at least one genre");
            return;
        }
        // User must select a releaseYear between 1950 and 2023 (optional)
        else if (
            (releaseYear && releaseYear < 1950) ||
            (releaseYear && releaseYear > 2023)
        ) {
            alert("Please select a valid year. Between 1950 and 2023");
            return;
        }

        if (sortBy === null) {
            setSortBy("popularity.desc");
        }

        // Comma separated genres
        let genreQuery = genres.join("%2C");

        let url = "/find/filter?";
        url += `genre=${genreQuery}`;
        url += `&sortBy=${sortBy}`;
        url += `&releaseYr=${releaseYear}`;
        url += `&certification=${certification}`;

        // Reroute the user to their query results page (server side)
        router.push(url);
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
        <div className="flex flex-col p-6 pt-0 sm:p-8 sm:w-full">
            <div className="w-full">
                <h1 className="pt-6 mb-3 text-2xl font-bold sm:pt-0 dark:text-white">
                    Find a Movie
                </h1>
                <form
                    className="flex items-center content-center w-full gap-6 mb-12"
                    onSubmit={handleSearchFormBtn}
                >
                    <input
                        type="search"
                        placeholder="Search for a movie"
                        onChange={handleSearchQueryBtn}
                        value={searchString}
                        aria-label="Search Input"
                        className="p-2 bg-lightbg caret-redtheme dark:bg-graybg rounded-md dark:placeholder-white dark:text-white text-sm py-[10px] border-lightbg dark:border-graybg border-2 placeholder:text-[#6A6A6A]"
                    ></input>
                    <button
                        className="flex gap-4 text-redtheme hover:text-white dark:text-white btn"
                        type="submit"
                        aria-label="Search Button"
                    >
                        <BiSearch size={24} />
                    </button>
                </form>
                <h1 className="mb-3 text-2xl font-bold dark:text-white">
                    Filter Movies
                </h1>
                <h3 className="mb-3 text-graytext text-md">Genres</h3>
                <ToggleButtonGroup
                    value={genres}
                    onChange={handleGenreClick}
                    exclusive={false}
                    className={"flex flex-wrap gap-4 dark:text-white mb-6"}
                >
                    {/* Generate buttons for each genre */}
                    {genreList.map((g) => {
                        return (
                            <ToggleButton
                                value={g.id}
                                aria-label={g.name}
                                key={g.id}
                                className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                            >
                                {g.name}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
                <h3 className="mb-3 text-graytext text-md">Sort By</h3>
                <ToggleButtonGroup
                    value={sortBy}
                    onChange={handleSortClick}
                    exclusive={true}
                    className={"flex flex-wrap gap-4 text-white mb-8"}
                >
                    <ToggleButton
                        value="popularity.desc"
                        aria-label="Most Popular (desc)"
                        className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        Most Popular (desc)
                    </ToggleButton>
                    <ToggleButton
                        value="release_date.desc"
                        aria-label="Release Date (newest)"
                        className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        Release Date (newest)
                    </ToggleButton>
                    <ToggleButton
                        value="revenue.desc"
                        aria-label="Release Date (oldest)"
                        className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        Revenue (desc)
                    </ToggleButton>
                    <ToggleButton
                        value="vote_average.desc"
                        aria-label="Rating (desc)"
                        className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        Rating (desc)
                    </ToggleButton>
                </ToggleButtonGroup>
                <div>
                    <h3 className="w-full mb-3 text-graytext text-md">
                        Release Year &#40;Optional&#41;
                    </h3>
                    <input
                        type="number"
                        min="1950"
                        max="2023"
                        placeholder="year"
                        aria-label="Release Year"
                        className="p-2 mb-8 dark:bg-graybg rounded-md dark:placeholder-white dark:text-white text-sm mr-4 py-[10px] bg-lightbg placeholder:text-[#6A6A6A]"
                        onChange={handleDateClick}
                    ></input>
                </div>
                <h3 className="mb-3 text-graytext text-md">
                    Movie Rating &#40;Optional&#41;
                </h3>
                <ToggleButtonGroup
                    value={certification}
                    onChange={handleCertificationClick}
                    exclusive={true}
                    className={"flex flex-wrap gap-4 dark:text-white mb-8"}
                >
                    <ToggleButton
                        value="G"
                        aria-label="G"
                        className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        G
                    </ToggleButton>
                    <ToggleButton
                        value="PG"
                        aria-label="PG"
                        className="lowercase rounded-md pp-2 dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        PG
                    </ToggleButton>
                    <ToggleButton
                        value="PG-14A"
                        aria-label="PG-14A"
                        className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        PG-14A
                    </ToggleButton>
                    <ToggleButton
                        value="18A"
                        aria-label="18A"
                        className="p-2 lowercase rounded-md dark:text-white dark:bg-graybg dark:hover:bg-graybgl bg-lightbg hover:bg-lightbgd"
                    >
                        18A
                    </ToggleButton>
                </ToggleButtonGroup>
                <button
                    className="cursor-pointer hover:text-white btn dark:text-white text-redtheme"
                    onClick={handleFilterBtn}
                >
                    Search
                </button>
            </div>
        </div>
    );
}
