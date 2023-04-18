"use client";

import { useEffect, useState, useContext } from "react";
import { Thumbnail } from "../components/thumbnail";
import axios from "axios";
import { LoginModalContext } from "./modalprovider";

export default function FavouritesList(props: any) {
    const [mounted, setMounted] = useState<Boolean>(false);
    const [movies, setMovies] = useState<Object[]>([]);

    useEffect(() => {
        if (props.status === "authenticated") {
            axios
                .get("/api/favourites", {
                    // params: { username: session?.user?.name },
                    params: { username: props.user },
                })
                .then((response) => {
                    // Response data contains array of favourited movies
                    setMovies(response.data);
                    setMounted(true);
                })
                .catch((error) => {
                    console.error("Favourites page error", error.message);
                });
        }
        // No logged in user
        else {
            setMounted(true);
        }
    }, [props.status, props.user]);

    // Context for if the modal should be open or closed
    const { show, openModal, closeModal } = useContext(LoginModalContext);

    function loginBtn() {
        openModal();
    }

    // Don't display the favourites list until it has been fully loaded
    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full h-full">
            {props.status === "authenticated" && (
                <div className="w-full">
                    {" "}
                    <h1 className="pt-3 mb-3 text-2xl font-bold sm:pt-0 dark:text-white">
                        Your favourite movies
                    </h1>
                    {movies && movies.length === 0 && (
                        <div>
                            You don&apos;t have any favourites! Visit the movies
                            page to add a favourite
                        </div>
                    )}
                    {movies && movies.length > 0 && (
                        <div className="grid grid-flow-row grid-cols-1 gap-4 mt-8 mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
                            {movies.map((movie: any) => {
                                // Only return movies with a poster
                                return (
                                    movie.imgPath !== null && (
                                        <Thumbnail
                                            key={movie.id}
                                            movie={movie}
                                        />
                                    )
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
            {props.status !== "authenticated" && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                    <h1 className="px-8 text-2xl font-bold dark:text-white">
                        Login to see your favourite movies
                    </h1>
                    <button
                        onClick={loginBtn}
                        className="btn dark:text-white text-redtheme"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}
