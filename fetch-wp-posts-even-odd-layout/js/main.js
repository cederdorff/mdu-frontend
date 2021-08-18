"use strict";

// const url = "http://wp-astra.cederdorff.com/wp-json/wp/v2/posts";
// const url = "http://wp-astra.cederdorff.com/wp-json/wp/v2/posts?_embed";
const url = "http://wp-astra.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=6";


fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (posts) {
    console.log(posts);
    appendPosts(posts);
  });

// append wp posts to the DOM
function appendPosts(posts) {
  let htmlTemplate = "";
  for (let post of posts) {
    console.log(post);
    htmlTemplate += /*html*/`
      <article>
        <div class="img-container">
            <img src="${getFeaturedImageUrl(post)}">
        </div>
        <div class="content-container">
            <div class="content">
            <h3>${post.title.rendered}</h3>
            <p>${post.content.rendered}</p>
            </div>
        </div>
      </article>
    `;
  }
  document.querySelector('#posts').innerHTML = htmlTemplate;
}

// get the featured image url
function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}