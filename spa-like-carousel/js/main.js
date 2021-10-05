import Carousel from "./carousel.js";

const board = document.querySelector('#board');
const _carousel = new Carousel(board);
let _movies = [];
let _favMovies = [];

async function getPosts() {
    const url = "https://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed";
    const response = await fetch(url);
    _movies = await response.json();
    console.log(_movies);
    appendCards(_movies);
}

getPosts();

function appendCards(posts) {
    for (const post of posts) {
        let template = /*html*/`
            <article>
                <h2>${post.title.rendered}</h2>
                <img src="${getFeaturedImageUrl(post)}">
            </article>
        `;
        _carousel.push(template, post.id);
    }
    _carousel.handle();
}

// Get image URL
function getFeaturedImageUrl(post) {
    let imageUrl = "";
    if (post._embedded['wp:featuredmedia']) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    return imageUrl;
}

function appendFavMovies() {
    let html = "";
    for (const movieId of _favMovies) {
        const movie = _movies.find(movie => movie.id == movieId);
        console.log(movie);
        html += /*html*/`
            <article>
                <h2>${movie.title.rendered}</h2>
                <img src="${getFeaturedImageUrl(movie)}">
            </article>
        `;
    }
    document.querySelector("#favMovieContainer").innerHTML = html;
}

window.like = (id) => {
    console.log("Like, post id: " + id);
    // add to favorites 🎉
    _favMovies.push(id);
    appendFavMovies();

    console.log(_carousel);
    if (_carousel.cards.length === 1) {
        navigateTo("favs");
    }
}

window.dislike = (id) => {
    console.log("Dislike, post id: " + id);

    console.log(_carousel);
    if (!_carousel.nextCard) {
        alert("Last movie card");
    }
}