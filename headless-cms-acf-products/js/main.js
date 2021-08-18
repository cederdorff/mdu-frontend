"use strict";

fetch("https://product-api.cederdorff.com/wp-json/wp/v2/posts?_embed")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    appendProducts(json);
  });

function appendProducts(products) {
  for (let product of products) {
    console.log(product);
    document.querySelector("#grid-products").innerHTML += /*html*/`
    <article>
      <h3>${product.title.rendered}</h3>
      <img src="${getFeaturedImageUrl(product)}">
      <h4>Description</h4>
      <p>${product.acf.description}</p>
      <h4>Specification</h4>
      <p>${product.acf.specification}</p>
      <p>Price: <strong>${product.acf.price}</strong></p>
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