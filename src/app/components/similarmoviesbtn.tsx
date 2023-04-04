"use client";
import { useRouter } from "next/navigation";

interface SimilarMovie {
    id: number;
    title: string;
}

// Client side back button
export function SimilarMoviesBtn(props: SimilarMovie) {
    const router = useRouter();

    function handleBtnClick() {
        // Redirect to the similar movie route
        router.push(`/movies/${props.id}`);
    }

    return (
        // Similar movie button
        <button
            type="button"
            className="self-start text-center text-gray-500 border-gray-500 dark:text-gray-400 dark:border-gray-400 btn hover:text-white hover:border-redtheme dark:hover:border-redtheme dark:hover:text-white"
            onClick={handleBtnClick}
        >
            {props.title}
        </button>
    );
}
