"use strict"; // to enable strict mode and modern JavaScript functionality

async function fetchInstagramPosts(userName) {
  let url = `https://instagram.com/${userName}/?__a=1`;
  let response = await fetch(url); // fetch and wait the response
  let data = await response.json(); // read response body and wait for parsing the JSON
  let posts = data.graphql.user.edge_owner_to_timeline_media.edges;
  appendPosts(posts);
}

function appendPosts(posts) {
  let htmlTemplate = "";
  for (const post of posts) {
    let imageUrl = post.node.thumbnail_src;
    let url = `https://www.instagram.com/p/${post.node.shortcode}/`

    htmlTemplate += /*html*/ `
      <article>
        <a href="${url}" target="_blank" alt="">
          <img src="${imageUrl}">
        </a>
      </article>
    `;
  }
  document.querySelector("#instagram-posts").innerHTML = htmlTemplate;
}

fetchInstagramPosts("erhvervsakademiaarhus");