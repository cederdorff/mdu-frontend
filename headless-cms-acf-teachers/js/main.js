"use strict";

fetch("https://headlesscms.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=2")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    appendPosts(json);
  });

function appendPosts(posts) {
  for (let post of posts) {
    console.log(post);
    document.querySelector("#grid-posts").innerHTML += /*html*/`
    <article>
      <img src="${getFeaturedImageUrl(post)}">
      <h3>${post.title.rendered}</h3>
      <p>Email: <a href="mailto:${post.acf.email}">${post.acf.email}</a></p>
      <p>Phone: ${post.acf.phone}</p>
    </article>
    `;
  }
}

function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}