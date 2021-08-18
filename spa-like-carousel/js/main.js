import Carousel from "./carousel.js";

let board = document.querySelector('#board');

let carousel = new Carousel(board);

async function getPosts() {
    const url = "https://api.cederdorff.com/wp-json/wp/v2/posts?categories=2";
    let response = await fetch(url);
    let posts = await response.json();
    console.log(posts);
    appendCards(posts);
}

getPosts();

function appendCards(posts) {
    for (const post of posts) {
        let template = /*html*/`
            <article>
                <h2>${post.title.rendered}</h2>
                <img src="${post.acf.image_1.url}">
            </article>
        `;
        carousel.push(template, post.id);
    }
    carousel.handle();
}

window.like = function like(id) {
    console.log("Like, post id: " + id);
    // add to favorites 🎉
}

window.dislike = function dislike(id) {
    console.log("Dislike, post id: " + id);
}