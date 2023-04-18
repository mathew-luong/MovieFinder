"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useSession } from "next-auth/react";

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
    usern?: String | undefined | null;
}

export default function FavouriteBtn(props: MovieProp) {
    const [favourite, setFavourite] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { data: session, status } = useSession();

    // Check if movie is favourited on mount and when status changes (when user logs in/out)
    useEffect(() => {
        if (status === "authenticated") {
            axios
                .get("/api/favMovie", {
                    params: { username: session.user?.name, movieId: props.id },
                })
                .then((res) => {
                    setFavourite(Boolean(res.data));
                    setMounted(true);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            setMounted(true);
        }
    }, [status, session?.user?.name, props.id]);

    function handleFavBtn() {
        if (status === "authenticated") {
            // Movie is already favourited, so unfavourite it
            if (favourite) {
                axios
                    .delete("/api/favMovie", {
                        params: {
                            username: session.user?.name,
                            movieId: props.id,
                        },
                    })
                    .then((response) => {
                        toast.error("Removed from favourites");
                        setFavourite(!favourite);
                    })
                    .catch((error) => {
                        toast.error("Error removing from favourites");
                    });
            }
            // Favourite movie
            else {
                let data = props;
                // Add logged in user to data object
                data["usern"] = session.user?.name;
                axios
                    .post("/api/favMovie", data)
                    .then((response) => {
                        toast.success("Added to favourites");
                        setFavourite(!favourite);
                    })
                    .catch((error) => {
                        console.log("FAV BTN ERROR", error);
                        toast.error("Error adding to favourites");
                    });
            }
        } else {
            toast.error("You must be logged in to do that");
        }
    }

    // Don't display the favourite button until mounted
    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={handleFavBtn}
            className="inline-flex dark:text-white text-redtheme btn hover:text-white hover:bg-redtheme active:bg-reddark"
            style={
                favourite
                    ? { backgroundColor: "#DC3B3B" }
                    : { backgroundColor: "transparent" }
            }
        >
            {mounted && !favourite && (
                <>
                    <AiOutlineHeart size={20} className="self-center mr-2" />
                    <p>favourite</p>
                </>
            )}
            {mounted && favourite && (
                <>
                    <AiFillHeart
                        size={20}
                        className="self-center mr-2 text-white"
                    />
                    <p className="text-white">favourited</p>
                </>
            )}
        </button>
    );
}
