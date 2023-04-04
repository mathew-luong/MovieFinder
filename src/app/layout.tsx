import { Sidebar } from "./components/sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./components/providers";

export const metadata = {
    title: "Movie Finder",
    description:
        "Movie Finder is an application designed to help you find a movie!",
};

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                <Providers>
                    <Sidebar />
                    <main className="ml-auto basis-5/6 sm:basis-4/6 md:basis-3/5 lg:basis-4/5">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
