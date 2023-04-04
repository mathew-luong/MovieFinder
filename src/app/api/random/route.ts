// Get an object containing movies from a random page
async function getRandomMovies() {
    // Discover returns thousands of pages of results, pick a random page from 1-500 to ensure a relevant movie
    const randPage = Math.floor(Math.random() * 500) + 1;

    // Sorted by popularity (desc) to ensure relevant results
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US
    &sort_by=popularity.desc&vote_average.gte=0.0&include_adult=false&include_video=false&page=${randPage}`,
        { cache: "no-store" }
    );
    const movies = await res.json();
    return movies;
}

// Returns a random movie id
async function generateRandomMovie() {
    // Object containing random page of movies
    let randMovies = await getRandomMovies();
    // Array of movies from a random page
    let randMoviesResults = randMovies.results;

    // Get random index within random movies array
    let randIndex = Math.floor(Math.random() * randMoviesResults.length);

    // Return random movie id
    return randMoviesResults[randIndex].id;
}

export async function GET(request: Request) {
    let randId = await generateRandomMovie();
    return new Response(randId);
}
