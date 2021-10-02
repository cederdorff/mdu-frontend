"use strict";

// =========== Movie SPA functionality =========== //

let _movies = [];
let _selectedMovieId;

async function init() {
    await getMovies();
    await getCategories();
}
init()

// fetch all movies from WP
async function getMovies() {
    let response = await fetch("https://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed");
    let data = await response.json();
    console.log(data);
    _movies = data;
    appendMovies(data, "#movies-container");
    showLoader(false);
}



// append movies to the DOM
function appendMovies(movies, container) {
    let htmlTemplate = "";
    for (let movie of movies) {
        htmlTemplate += /*html*/ `
        <article onclick="showDetailView('${movie.id}')">
            <h2>${movie.title.rendered} (${movie.acf.year})</h2>
            <img src="${getFeaturedImageUrl(movie)}">
            <p>${movie.excerpt.rendered}</p>
        </article>
    `;
    }
    document.querySelector(container).innerHTML = htmlTemplate;
}

// appends posts for each cagtegory on the search page
function appendPostsByCategories(categories) {
    let html = ""
    // loop through all categories: Action, Adventure, Animation, Comedy, Drama Fantasy, Horror, etc. 
    for (const category of categories) {
        // creating html for the catgegory title (<h2>Actions</h2>) - headers on search page
        html +=/*html*/`<h2>${category.name}</h2>`;
        // looping through all movies 
        for (const movie of _movies) {
            // if the movie has the id of the given category, ex id of Action
            if (movie.categories.includes(category.id)) {
                // creating html for the movie
                html += /*html*/ `
                    <article onclick="showDetailView('${movie.id}')">
                        <h2>${movie.title.rendered} (${movie.acf.year})</h2>
                        <img src="${getFeaturedImageUrl(movie)}">
                        <p>${movie.excerpt.rendered}</p>
                    </article>
                `;
            }
        }
    }
    // when looped through all categories and created html for all matching movies, add html to search page (#categories-container)
    document.querySelector("#categories-container").innerHTML = html;
}

// search functionality
function search(value) {

    // show or hide results (search container)
    if (value) {
        document.querySelector("#search-container").classList.remove("hide");
        document.querySelector("#categories-container").classList.add("hide");
    } else {
        document.querySelector("#search-container").classList.add("hide");
        document.querySelector("#categories-container").classList.remove("hide");
    }

    let searchQuery = value.toLowerCase();
    let filteredMovies = [];
    for (let movie of _movies) {
        let title = movie.title.rendered.toLowerCase();
        if (title.includes(searchQuery)) {
            filteredMovies.push(movie);
        }
    }
    appendMovies(filteredMovies, "#movies-search-container");
}

// fetch all genres / categories from WP
async function getCategories() {
    let response = await fetch("https://movie-api.cederdorff.com/wp-json/wp/v2/categories");
    let data = await response.json();
    console.log(data);
    appendCategories(data);
    appendPostsByCategories(data);
}

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
    }
}

// append movies by genre
function appendMoviesByCategory(moviesByCategory) {
    let htmlTemplate = "";
    for (let movie of moviesByCategory) {
        htmlTemplate += /*html*/ `
        <article onclick="showDetailView('${movie.id}')">
            <h2>${movie.title.rendered} (${movie.acf.year})</h2>
            <img src="${getFeaturedImageUrl(movie)}">
            <p>${movie.excerpt.rendered}</p>
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

// get the featured image url
function getFeaturedImageUrl(post) {
    let imageUrl = "";
    if (post._embedded['wp:featuredmedia']) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    return imageUrl;
}

function showDetailView(id) {
    const movie = _movies.find(movie => movie.id == id);
    document.querySelector("#detailView h2").innerHTML = movie.title.rendered;
    document.querySelector("#detailViewContainer").innerHTML = /*html*/`
        <img src="${getFeaturedImageUrl(movie)}">
        <article>
            <h1>${movie.title.rendered}</h1>
            <h2>${movie.acf.year}</h2>
            <p>${movie.content.rendered}</p>
            <iframe src="${movie.acf.trailer}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </article>
    `;
    navigateTo("detailView");
}

if (!_selectedMovieId) {
    navigateTo("movies");
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
