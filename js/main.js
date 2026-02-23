const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");

// Buscar ao clicar no botão
searchBtn.addEventListener("click", async () => {
  const movieName = searchInput.value.trim();

  if (movieName === "") {
    alert("Digite o nome de um filme!");
    return;
  }

try {
  showLoader();
  moviesContainer.innerHTML = "";
  const movies = await searchMovies(movieName);
  renderMovies(movies);
} catch (error) {
  alert("Erro ao buscar filmes!");
  console.error(error);
} finally {
  hideLoader();
});

// Buscar ao pressionar Enter
searchInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
