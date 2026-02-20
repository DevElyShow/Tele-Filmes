import { getPopularMovies, searchMovies, getMovieDetails } from "./api.js";
import { getFavorites, toggleFavorite } from "./storage.js";
import { renderMovies } from "./ui.js";

const moviesGrid = document.getElementById("moviesGrid");
const sectionTitle = document.getElementById("sectionTitle");

const homeBtn = document.getElementById("homeBtn");
const favoritesBtn = document.getElementById("favoritesBtn");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let currentView = "home";

async function loadHome() {
  currentView = "home";
  sectionTitle.textContent = "🔥 Filmes Populares";
  const movies = await getPopularMovies();
  renderMovies(moviesGrid, movies, openMovieModal);
}

function loadFavorites() {
  currentView = "favorites";
  sectionTitle.textContent = "❤️ Meus Favoritos";
  const favorites = getFavorites();
  renderMovies(moviesGrid, favorites, openMovieModal);
}

async function openMovieModal(movieId) {
  const movie = await getMovieDetails(movieId);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  modalBody.innerHTML = `
    <img src="${imageUrl}" class="modal-poster" />
    <div>
      <h2>${movie.title}</h2>
      <p><strong>⭐ Nota:</strong> ${movie.vote_average}</p>
      <p><strong>📅 Lançamento:</strong> ${movie.release_date}</p>
      <p>${movie.overview}</p>
      <button id="favoriteBtn">❤️ Favoritar</button>
    </div>
  `;

  document
    .getElementById("favoriteBtn")
    .addEventListener("click", () => {
      toggleFavorite(movie);
      if (currentView === "favorites") loadFavorites();
    });

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () =>
  modal.classList.add("hidden")
);

homeBtn.addEventListener("click", loadHome);
favoritesBtn.addEventListener("click", loadFavorites);

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) return loadHome();

  const movies = await searchMovies(query);
  sectionTitle.textContent = `🔎 Resultado da busca`;
  renderMovies(moviesGrid, movies, openMovieModal);
});

loadHome();