import Spa from "./spa.js";
import MovieService from "./movie-service.js";

let spa = new Spa("movies");
let movieService = new MovieService();

movieService.init();

window.pageChange = function() {
  spa.pageChange();
}

window.categorySelected = function(id) {
  movieService.getMoviesByCategory(id);
}

window.search = function(searchValue) {
  movieService.search(searchValue);
}