import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/client";

// Get the current user session
// {e.g.  user: { name: 'admin', email: undefined, image: undefined } }
export async function getSession() {
    const session = await getServerSession(authOptions);
    return session;
}

// Get curr user object (user.id, user.username)
export default async function getCurrUser() {
    try {
        const session = await getSession();
        if (!session?.user?.name) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                username: session.user.name as string,
            },
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (e) {}
}
