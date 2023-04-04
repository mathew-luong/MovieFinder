// Display loading animation
export default function Loading() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-[100vh] w-[100%]">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-current border-redtheme border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            {/* <h1 className="text-lg text-white">Loading</h1> */}
        </div>
    );
}
