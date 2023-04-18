import { Sidebar } from "./components/sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./components/providers";
import getCurrUser from "./libs/session";

export const metadata = {
    title: "Movie Finder",
    description:
        "Movie Finder is an application designed to help you find a movie!",
    openGraph: {
        title: "MovieFinder",
        url: "https://moviefinder.vercel.app",
    },
    keywords: [
        "Movies",
        "Movie finder",
        "Random movie",
        "Find movies",
        "Next.js",
        "TypeScript",
    ],
    icons: {
        icon: { url: "/favicon.ico", type: "image" },
        apple: "static/apple-touch-icon.png",
    },
};

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Get the currently logged in user (if it exists) and pass it to the sidebar
    let currUser = await getCurrUser();

    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            {/* HEAD FOR SEO */}
            <head>
                {/* Used to be added by default, now we need to add manually */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <meta
                    name="description"
                    content="Movie Finder is an application designed to help you find a movie!"
                />
            </head>
            <body className="flex flex-row bg-white dark:bg-darkbg">
                {/* Providers for next-auth, dark/light mode, login modal open/close */}
                <Providers>
                    <Sidebar currUsername={currUser?.username} />
                    <main className="ml-auto basis-5/6 sm:basis-4/6 md:basis-3/5 lg:basis-4/5">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
