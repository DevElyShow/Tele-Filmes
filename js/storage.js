export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function toggleFavorite(movie) {
  let favorites = getFavorites();
  const exists = favorites.find((fav) => fav.id === movie.id);

  if (exists) {
    favorites = favorites.filter((fav) => fav.id !== movie.id);
  } else {
    favorites.push(movie);
  }

  saveFavorites(favorites);
}