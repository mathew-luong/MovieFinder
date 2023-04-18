"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";

export default function LogoutBtn() {
    function handleLogout() {
        signOut();
        toast.success("Logged out");
    }

    return (
        <div className="flex justify-center w-full sm:justify-start">
            <button
                type="button"
                onClick={handleLogout}
                className="flex justify-center w-full gap-4 px-4 py-3 text-sm align-middle rounded-md sm:bg-white sm:dark:bg-darkbg drop-shadow-sm sm:justify-start text-graytext dark:text-white focus:outline-none hover:text-redtheme dark:hover:text-redtheme"
            >
                <BiLogOut
                    size="24"
                    className="self-center w-[36px] h-[36px] sm:w-[24px] sm:h-[24px] sm:self-start text-center"
                />
                <span className="hidden sm:block">Logout</span>
            </button>
        </div>
    );
}
