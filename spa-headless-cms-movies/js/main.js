"use strict";

// =========== Movie SPA functionality =========== //

let _movies = [];

// fetch all movies from WP
async function getMovies() {
  let response = await fetch("https://movie-api.cederdorff.com/wp-json/wp/v2/posts");
  let data = await response.json();
  console.log(data);
  _movies = data;
  appendMovies(data);
  showLoader(false);
}

getMovies();

// append movies to the DOM
function appendMovies(movies) {
  let htmlTemplate = "";
  for (let movie of movies) {
    htmlTemplate += /*html*/ `
      <article>
        <h2>${movie.title.rendered} (${movie.acf.year})</h2>
        <img src="${movie.acf.img}">
        <p>${movie.acf.description}</p>
        <iframe src="${movie.acf.trailer}"></iframe>
      </article>
    `;
  }
  document.querySelector('#movies-container').innerHTML = htmlTemplate;
}

// search functionality
function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredMovies = [];
  for (let movie of _movies) {
    let title = movie.title.rendered.toLowerCase();
    if (title.includes(searchQuery)) {
      filteredMovies.push(movie);
    }
  }
  appendMovies(filteredMovies);
}

// fetch all genres / categories from WP
async function getCategories() {
  let response = await fetch("https://movie-api.cederdorff.com/wp-json/wp/v2/categories");
  let data = await response.json();
  console.log(data);
  appendCategories(data);
}

getCategories();

// append all genres as select options (dropdown)
function appendCategories(categories) {
  let htmlTemplate = "";
  for (let category of categories) {
    htmlTemplate += /*html*/ `
      <option value="${category.id}">${category.name}</option>
    `;
  }
  document.querySelector('#select-category').innerHTML += htmlTemplate;
}

// category selected event - fetch movies by selected category
async function categorySelected(categoryId) {
  if (categoryId) {
    showLoader(true);
    let response = await fetch(`https://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}`)
    let data = await response.json();
    appendMoviesByCategory(data);
    showLoader(false);
  } else {
    document.querySelector('#movies-by-category-container').innerHTML = /*html*/ `
      <p>Please, select category</p>
    `;
  }
}

// append movies by genre
function appendMoviesByCategory(moviesByCategory) {
  let htmlTemplate = "";
  for (let movie of moviesByCategory) {
    htmlTemplate += /*html*/ `
      <article>
        <h2>${movie.title.rendered} (${movie.acf.year})</h2>
        <img src="${movie.acf.img}">
        <p>${movie.acf.description}</p>
        <iframe src="${movie.acf.trailer}"></iframe>
      </article>
    `;
  }
  // if no movies, display feedback to the user
  if (moviesByCategory.length === 0) {
    htmlTemplate = /*html*/ `
      <p>No Movies</p>
    `;
  }
  document.querySelector('#movies-by-category-container').innerHTML = htmlTemplate;
}


// =========== Loader functionality =========== //

function showLoader(show = true) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}