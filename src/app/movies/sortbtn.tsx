"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "next/navigation";

export default function SortBtn() {
    const [sort, setSort] = useState<string>("Now Playing");
    const searchParams = useSearchParams();

    // Used to route the user to the result of their query
    const router = useRouter();

    const sortParam = searchParams.get("sortBy");

    function handleSort(event: SelectChangeEvent) {
        setSort(event.target.value as string);
        router.push(`/movies?sortBy=${event.target.value}`);
    }

    return (
        <div className="flex flex-wrap justify-between p-8">
            <h1 className="mb-8 text-2xl font-bold dark:text-white sm:mb-0">
                {sortParam}
            </h1>
            <Select
                value={sortParam !== null ? sortParam : sort}
                onChange={handleSort}
                className="text-white bg-graybg"
                sx={{
                    color: "white",
                    borderRadius: "6px",
                    height: "2.5rem",
                    padding: 0,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: 0,
                        display: "none",
                    },
                    ".MuiSvgIcon-root ": {
                        fill: "white !important",
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: "#393939",
                            "& .MuiMenuItem-root": {
                                padding: 1,
                            },
                            "& .MuiMenuItem-root:hover": {
                                backgroundColor: "#545454",
                            },
                            color: "#fff",
                        },
                    },
                }}
            >
                <MenuItem value="Now Playing">Now Playing</MenuItem>
                <MenuItem value="Top Rated">Top Rated</MenuItem>
                <MenuItem value="Upcoming Movies">Upcoming Movies</MenuItem>
            </Select>
        </div>
    );
}
