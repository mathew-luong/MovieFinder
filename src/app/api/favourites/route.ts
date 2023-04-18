import prisma from "@/app/libs/client";
import { NextResponse } from "next/server";

// Get list of users favourite movies
export async function GET(request: Request) {
    // Username is passed in as search param in url e.g. /api/favourites?username=...
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    // Get user
    const user = await prisma.user.findUnique({
        where: {
            username: username!,
        },
    });

    // If the user doesn't exist return an error
    if (!user) {
        return new Response("Error finding user", {
            status: 500,
        });
    }

    // get user's id
    const userId: number = user?.id;

    // get users favourited movies
    const favourited = await prisma.movie.findMany({
        where: {
            favUsers: {
                some: {
                    userId: userId,
                },
            },
        },
    });

    // New user created
    return NextResponse.json(favourited);
}
