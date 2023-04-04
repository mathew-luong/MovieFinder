const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    experimental: {
        appDir: true,
        scrollRestoration: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                port: "",
                pathname: "/t/p/w500/**",
            },
        ],
    },
});

/** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         appDir: true,
//         scrollRestoration: true,
//     },
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: "image.tmdb.org",
//                 port: "",
//                 pathname: "/t/p/w500/**",
//             },
//         ],
//     },
// };

// module.exports = nextConfig;
