import ClientForm from "./clientform";

// Used to get the search query set by the client onto the server
export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // For /find/filter?genre=878, params.query = filter, searchParams.genre = 878
    // For /find/search?query=spiderman, params.query = search, searchParams.genre = spiderman
    // The return value is the metadata object
    return { title: "Discover | Movie Finder" };
}

export default function Find() {
    return (
        <div>
            {/* Form is client side */}
            <ClientForm />
        </div>
    );
}
