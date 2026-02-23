const API_KEY = "thewdb"; // API gratuita pública
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

async function searchMovies(movieName) {
  try {
    const response = await fetch(`${BASE_URL}&s=${encodeURIComponent(movieName)}`);
    const data = await response.json();

    if (data.Response === "False") {
      return [];
    }

    return data.Search;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
}
