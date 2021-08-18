"use strict";

// =========== Movie SPA functionality =========== //

let _data = [];

// fetch data from WP
async function getData() {
  // let response = await fetch("https://your-domain.com/wp-json/wp/v2/posts");
  // let data = await response.json();
  showLoader(false);
}

getData();

// append data to the DOM
function appendData(data) {

}


// search functionality
function search(value) {

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