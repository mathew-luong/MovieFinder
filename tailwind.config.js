/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                darkbg: "#222127",
                dark: "#121212",
                lightbg: "#EEF3F4",
                lightbgd: "#E6E7E8",
                redtheme: "#DC3B3B",
                reddark: "#A01616",
                graytext: "#A1A1A1",
                graybg: "#393939",
                graybgl: "#545454",
                graytext: "#AAAAAA",
            },
        },
    },
    plugins: [],
    important: true,
};
