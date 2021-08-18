import movieService from "../services/movie.js";

export default class MoviePage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="movies" class="page">
        <header class="topbar">
          <h2>Movies</h2>
          <a class="right" href="#favorites">Favorites</a>
        </header>
        <section id="movie-container" class="grid-container"></section>
      </section>
    `;
  }

  addToFavourites(movieId) {
    movieService.addToFavourites(movieId);
  }

  removeFromFavourites(movieId) {
    movieService.removeFromFavourites(movieId);
  }
}