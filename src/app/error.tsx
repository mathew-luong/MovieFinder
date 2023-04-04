"use client";
import { MdOutlineError } from "react-icons/md";

export default function Error() {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-screen gap-4 text-white bg-redtheme">
            <div className="text-white">
                <MdOutlineError size={64} />
            </div>
            <h1 className="px-8 text-3xl">Oops something went wrong!</h1>
        </div>
    );
}
