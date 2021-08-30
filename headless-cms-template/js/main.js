"use strict";

async function getData() {
  let response = await fetch("http://persons-api.racedev.dk/wp-json/wp/v2/posts");
  let data = response.json();
  console.log(data);
  appendPosts(data);
}

getData();

// append wp posts to the DOM
function appendPosts(posts) {
  let template = "";
  for (const post of posts) {
    console.log(post);
    template += /*html*/`
      <article>
        <img src="${post.acf.image.url}">
        <h2>${post.title.rendered}</h2>
        <a href="mailto:${post.acf.mail}">${post.acf.mail}</a>
        <p>${post.acf.age} years old</p>
      </article>
    `;
  }
  document.getElementById("content").innerHTML = template;
}

// get the featured image url
function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}