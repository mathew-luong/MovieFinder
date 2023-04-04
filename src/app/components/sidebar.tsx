// Sidebar is client rendered
"use client";

import { AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import { MdMovie, MdOutlineScreenSearchDesktop } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./themetoggle";
import LoginModal from "./loginmodal";

export const Sidebar = () => {
    // Get current pathname
    const pathname = usePathname();

    return (
        // <nav className="fixed top-0 left-0 flex w-1/6 h-screen text-white bg-dark sm:w-2/6 md:w-2/5 lg:w-1/5 sm:h-screen">
        <nav className="fixed top-0 left-0 flex w-1/6 h-screen bg-lightbg dark:text-white dark:bg-dark sm:w-2/6 md:w-2/5 lg:w-1/5 sm:h-screen">
            <div className="flex flex-col w-[100%] sm:p-6 relative">
                <BsFillCameraVideoFill
                    size="36"
                    className="mx-auto mt-8 mb-16 sm:mb-10 text-redtheme"
                />
                <Link
                    href="/"
                    className={
                        pathname === "/" ? "sidebar-btn-active" : "sidebar-btn"
                    }
                >
                    <AiFillHome
                        className={
                            pathname === "/" ? "icon-size-active" : "icon-size"
                        }
                        size="24"
                    />
                    <p className="sidebar-text">Home</p>
                </Link>
                <Link
                    href="/find"
                    className={
                        pathname.includes("/find")
                            ? "sidebar-btn-active"
                            : "sidebar-btn"
                    }
                >
                    <MdOutlineScreenSearchDesktop
                        className={
                            pathname.includes("/find")
                                ? "icon-size-active"
                                : "icon-size"
                        }
                        size="24"
                    />
                    <p className="sidebar-text">Discover</p>
                </Link>
                <Link
                    href="/movies?sortBy=Now%20Playing"
                    className={
                        pathname.includes("/movies")
                            ? "sidebar-btn-active"
                            : "sidebar-btn"
                    }
                >
                    <MdMovie
                        className={
                            pathname.includes("/movies")
                                ? "icon-size-active"
                                : "icon-size"
                        }
                        size="24"
                    />
                    <p className="sidebar-text">Movies</p>
                </Link>
                <Link
                    href="/about"
                    className={
                        pathname === "/about"
                            ? "sidebar-btn-active"
                            : "sidebar-btn"
                    }
                >
                    <AiFillInfoCircle
                        className={
                            pathname === "/about"
                                ? "icon-size-active"
                                : "icon-size"
                        }
                        size="24"
                    />
                    <p className="sidebar-text">About</p>
                </Link>
                {/* Darkmode toggle on larger screens */}
                <div className="absolute left-0 right-0 flex flex-col gap-4 bottom-8">
                    <div className="flex justify-center w-full sm:justify-start sm:pl-4">
                        <ThemeToggle />
                    </div>
                    <div className="flex justify-center w-full sm:justify-start sm:pl-8 sm:pr-8">
                        {/* Display Login modal when user is not logged in */}
                        <LoginModal />
                    </div>
                </div>
            </div>
        </nav>
    );
};
