// Display loading animation for /movies/[id] page
export default function Loading() {
    return (
        <div className="flex flex-col sm:w-[100%] sm:h-screen px-8 md:p-8 mx-auto">
            <div className="flex w-full pt-0 2xl:p-8 md:pt-8 animate-pulse">
                {/* Back button */}
                <div className="absolute w-16 h-10 rounded bg-lightbgd dark:bg-graybg top-8 "></div>
                <div className="flex flex-col w-full gap-4 my-10 lg:gap-8 lg:flex-row">
                    {/* Image loading skeleton */}
                    <div className="rounded-xl bg-lightbgd dark:bg-graybg max-h-[750px] h-[500px] w-full xl:w-[50%] xl:min-h-[500px] lg:px-0 mt-16 sm:mt-4"></div>
                    <div className="w-full xl:[w-20%] mt-8 sm:mt-4">
                        <div className="grid w-full grid-cols-3 gap-4">
                            {/* Title */}
                            <div className="h-10 col-span-2 mb-6 rounded bg-lightbgd dark:bg-graybg"></div>
                            <div className="h-10 col-span-1 mb-6"></div>
                            {/* Genres */}
                            <div className="h-6 col-span-1 mb-8 rounded bg-lightbgd dark:bg-graybg"></div>
                            <div className="h-6 col-span-1 mb-8 rounded bg-lightbgd dark:bg-graybg"></div>
                            <div className="h-6 col-span-1 mb-8 rounded bg-lightbgd dark:bg-graybg"></div>
                        </div>
                        {/* Overview */}
                        <div className="h-5 mb-2 rounded bg-lightbgd dark:bg-graybg"></div>
                        <div className="h-5 mb-2 rounded bg-lightbgd dark:bg-graybg"></div>
                        <div className="h-5 mb-2 rounded bg-lightbgd dark:bg-graybg"></div>
                        <div className="h-5 mb-2 rounded bg-lightbgd dark:bg-graybg"></div>
                        <div className="h-5 mb-8 rounded bg-lightbgd dark:bg-graybg w-[50%]"></div>
                        {/* Trailer link */}
                        <div className="h-10 mb-2 rounded w-28 bg-lightbgd dark:bg-graybg"></div>
                        {/* Similar Movies */}
                        <div className="flex flex-wrap w-full gap-4 mt-8">
                            <div className="h-10 mb-2 rounded w-28 bg-lightbgd dark:bg-graybg"></div>
                            <div className="h-10 mb-2 rounded w-28 bg-lightbgd dark:bg-graybg"></div>
                            <div className="h-10 mb-2 rounded w-28 bg-lightbgd dark:bg-graybg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
