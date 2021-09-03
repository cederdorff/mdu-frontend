"use strict";

async function fetchData() {
  const url = "https://headlesscms.cederdorff.com/wp-json/wp/v2/posts?_embed";
}


function appendData(posts) {

}

function getImageUrl(post) {
  let url = "";
  if (post._embedded["wp:featuredmedia"]) {
    url = post._embedded["wp:featuredmedia"][0].source_url;
  } else {
    url = "img/favicon.png";
  }
  return url;
}