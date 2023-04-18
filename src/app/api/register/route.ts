import bcrypt from "bcrypt";
import prisma from "@/app/libs/client";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";

// Register a new user into the database
export async function POST(request: Request) {
    const body = await request.json();
    const { username, password, confirm } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // register new user into the database
    // independent of next-auth (once a user attempts to log in, authorization is done by next-auth)
    try {
        const user = await prisma.user.create({
            data: {
                username,
                hashedPassword,
            },
        });

        // New user created
        return NextResponse.json(user);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // Duplicate user error (username must be unique)
            if (e.code === "P2002") {
                return new Response("A user with this name already exists!", {
                    status: 500,
                });
            }
        }
        return new Response("Error creating user", {
            status: 500,
        });
    }
}
