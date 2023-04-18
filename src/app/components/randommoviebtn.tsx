"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect, useState } from "react";

async function fetcher(url: string) {
    const response = await fetch(url);
    // response contains the random movie id
    return response.json();
}

export default function RandomMovieBtn() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    // Only fetch when the user presses the button (or first load)
    const { data, mutate } = useSWR("/api/random", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    function btnPress() {
        // Fetch another random id
        mutate();
        router.push(`/movies/${data}`);
    }

    // Don't display the button until mounted
    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={btnPress}
            className="self-start w-auto mr-6 dark:text-white hover:text-white text-redtheme btn"
        >
            Discover a random movie
        </button>
    );
}
