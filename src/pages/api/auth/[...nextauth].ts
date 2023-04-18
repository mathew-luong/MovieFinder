import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                },
            },
            async authorize(credentials, req) {
                // Username or password were blank return null
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                // Try to find the user in the database
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username,
                    },
                });

                // User doesnt exist
                if (!user || !user?.hashedPassword) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isPasswordValid) {
                    return null;
                }

                // user with correct credentials
                return { name: user.username } as any;
            },
        }),
        // ...add more providers here
    ],
    pages: {
        // On errors, redirect to / route
        signIn: "/",
    },
    // authenticate users (already/registered in the db) and provide a session for the authenticated user
    session: {
        // Set to jwt in order to CredentialsProvider works properly
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // enable debug in development
    debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
