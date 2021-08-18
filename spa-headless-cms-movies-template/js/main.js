"use strict";

// =========== Movie SPA functionality =========== //

//global variable
let _movies = [];

// fetch all movies from WP
async function getMovies() {
  // TODO: fetch movies from wp headless and call appendMovies
  // https://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed
}

getMovies();

// append movies to the DOM
function appendMovies(movies) {
  // TODO: append movies to #movies-container
}

// search functionality
function search(value) {
  // TODO: search functionality
}

// fetch all genres / categories from WP
function getGenres() {
  // TODO: get categories from wp headless
  // https://movie-api.cederdorff.com/wp-json/wp/v2/categories
}

// append all genres as select options (dropdown)
function appendGenres(genres) {
  // TODO: append categories to #select-genre
}

// genre selected event - fetch movies by selected category
function genreSelected(genreId) {
  // TODO: fetch movies matching the given genreId
  // `https://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=${genreId}`
}

// append movies by genre
function appendMoviesByGenre(moviesByGenre) {
  // TODO: append movies using a for-of loop
}


// =========== Loader functionality =========== //

function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}