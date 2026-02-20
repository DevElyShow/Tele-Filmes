function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

function renderMovies(movies) {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  if (movies.length === 0) {
    container.innerHTML = "<p>Nenhum filme encontrado 😢</p>";
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const poster = movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=Sem+Imagem";

    movieCard.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>Ano: ${movie.Year}</p>
        <p>Tipo: ${movie.Type}</p>
      </div>
    `;

    container.appendChild(movieCard);
  });
}