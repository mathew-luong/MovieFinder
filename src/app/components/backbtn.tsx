"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

// Client side back button
export function BackBtn() {
    const router = useRouter();

    return (
        // Back button
        <button
            type="button"
            className="absolute flex items-center gap-2 text-redtheme dark:text-white btn top-8 hover:text-white"
            onClick={() => router.back()}
        >
            <IoMdArrowRoundBack />
            Back
        </button>
    );
}
