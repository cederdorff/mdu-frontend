import Spa from "./spa.js";
import MovieService from "./movie-service.js";

//init services 
let spa = new Spa("movies");
let movieService = new MovieService();
movieService.init();

// maiking event available for global scope
window.categorySelected = function (id) {
  movieService.getMoviesByCategory(id);
}

window.search = function (searchValue) {
  movieService.search(searchValue);
}

window.showDetailView = function (id) {
  movieService.showDetailView(id);
}