"use strict";

// Global variable
let _movies = [];
let _favMovies = [];

initApp();

/**
 * Initializing the app by loading and appending to the DOM
 */
async function initApp() {
  _movies = await loadMovies(); // execute the function to load the movies into _movies
  appendMovies(_movies);
}

/**
 * Fetch movie from data source: JSON file
 */
async function loadMovies() {
  let response = await fetch("./json/movies.json");
  let data = await response.json();
  return data;
}

/**
 * Appending movies to the DOM by the giving argument
 */
function appendMovies(movies) {
  let html = "";
  for (const movie of movies) {
    console.log(movie);
    html += /*html*/`
      <article>
        <h2>${movie.title} (${movie.year})</h2>
        <img src="${movie.img}">
        <p>${movie.description}</p>
        ${generateFavMovieButton(movie.id)}
      </article>
    `;
  }
  document.querySelector("#movie-container").innerHTML = html;
}

/* ---------- Movie Fav Functionality ---------- */

/**
 * Appending fav movies to the DOM by looping through _favMovies
 */
function appendFavMovies() {
  let html = "";
  for (const movie of _favMovies) {
    console.log(movie);
    html += /*html*/`
      <article>
        <h2>${movie.title} (${movie.year})</h2>
        <img src="${movie.img}">
        <p>${movie.description}</p>
        ${generateFavMovieButton(movie.id)}
      </article>
    `;
  }
  // if no movies display a default text
  if (_favMovies.length === 0) {
    html = "<p>No movies added to favorites</p>"
  }
  document.querySelector("#fav-movie-container").innerHTML = html;
}

/**
 * Generating the fav button
 */
function generateFavMovieButton(movieId) {
  let btnTemplate = `
    <button onclick="addToFavourites('${movieId}')">Add to favourites</button>`;
  if (isFavMovie(movieId)) {
    btnTemplate = `
      <button onclick="removeFromFavourites('${movieId}')" class="rm">Remove from favourites</button>`;
  }
  return btnTemplate;
}

/**
 * Adding movie to favorites by given movieId
 */
function addToFavourites(movieId) {
  let favMovie = _movies.find(movie => movie.id === movieId);
  _favMovies.push(favMovie);
  appendMovies(_movies); // update the DOM to display the right button
  appendFavMovies(); // update the DOM to display the right items from the _favMovies list
}

/**
 * Removing movie from favorites by given movieId
 */
function removeFromFavourites(movieId) {
  _favMovies = _favMovies.filter(movie => movie.id !== movieId);
  appendMovies(_movies); // update the DOM to display the right button
  appendFavMovies(); // update the DOM to display the right items from the _favMovies list
}

/**
 * Checking if movie already is added to _favMovies
 */
function isFavMovie(movieId) {
  return _favMovies.find(movie => movie.id === movieId); // checking if _favMovies has the movie with matching id or not
}

