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

  showLoader();
  moviesContainer.innerHTML = "";

  const movies = await searchMovies(movieName);

  hideLoader();
  renderMovies(movies);
});

// Buscar ao pressionar Enter (UX profissional)
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});