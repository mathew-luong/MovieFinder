"use client";

import { useSession } from "next-auth/react";
import FavouritesList from "../components/favouriteslist";

export default async function Page() {
    // status = "authenticated" if a user is logged in
    // session.user.name contains username of logged in user
    const { data: session, status } = useSession();

    return (
        <div className="flex flex-column sm:w-[100%] h-screen p-8">
            {/* Pass in the session user and session status (only logged in users can see favourites) */}
            <FavouritesList status={status} user={session?.user?.name} />
        </div>
    );
}
