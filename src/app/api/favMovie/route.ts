import prisma from "@/app/libs/client";
import { NextResponse } from "next/server";

// Add a new movie to the database and create a favourited relationship with the user
export async function POST(request: Request) {
    const body = await request.json();

    const {
        id,
        title,
        rating,
        releaseDate,
        runtime,
        overview,
        genres,
        imgPath,
        trailerUrl,
        simMoviesArr,
        usern,
    } = body;

    const obj = {
        id: Number(id),
        title: title,
        rating: rating,
        releaseDate: releaseDate,
        runtime: runtime,
        overview: overview,
        genres: genres,
        imgPath: imgPath,
        trailerUrl: trailerUrl,
    };

    // add favourited movie into the db (if it doesnt already exist)
    const favMovie = await prisma.movie.upsert({
        where: { id: Number(id) },
        update: {},
        create: obj,
    });

    // get logged in user (username is unique)
    const user = await prisma.user.findUnique({
        where: {
            username: usern,
        },
    });

    // If the user doesn't exist return an error
    if (!user) {
        return new Response("Error finding user", {
            status: 500,
        });
    }

    let userId = user?.id;

    // create favourite relation between user and movie (using user id and movie id)
    const favourited = await prisma.favourited.create({
        data: { userId: userId, movieId: Number(id), assignedAt: new Date() },
    });

    // New user created
    return NextResponse.json(favMovie);
}

// Checks to see if a user has favourited the associated movie
export async function GET(request: Request) {
    // Username is passed in as search param in url e.g. /api/favourites?username=...
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const movId = Number(searchParams.get("movieId"));

    // Get user
    const user = await prisma.user.findUnique({
        where: {
            username: username!,
        },
    });

    // If the user doesn't exist return an error
    if (!user) {
        return new Response("false", {
            status: 200,
        });
    }

    // get user's id
    const usId: number = user?.id;

    const isFavourited = await prisma.favourited
        .findFirst({
            // using findFirst instead of findMany will not return an array
            where: {
                userId: usId,
                movieId: movId,
            },
            // select: { userId: true }, // this line might not be necessary
        })
        .then((r) => {
            // returns a boolean (true if the user has favourited the movie)
            return Boolean(r);
        });

    return NextResponse.json(isFavourited);
}

// Unfavourite a movie (deletes it from Favourited table)
export async function DELETE(request: Request) {
    // Username is passed in as search param in url e.g. /api/favourites?username=...
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const movId = Number(searchParams.get("movieId"));

    // Get user
    const user = await prisma.user.findUnique({
        where: {
            username: username!,
        },
    });

    // If the user doesn't exist return an error
    if (!user) {
        return new Response("false", {
            status: 200,
        });
    }

    // get user's id
    const usId: number = user?.id;

    const deleteFav = await prisma.favourited.delete({
        where: {
            userId_movieId: {
                userId: usId,
                movieId: movId,
            },
        },
    });

    return NextResponse.json(deleteFav);
}
