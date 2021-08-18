"use strict"; // to enable strict mode and modern JavaScript functionality

function fetchInstagramPosts(userName) {
  let url = `https://instagram.com/${userName}/?__a=1`;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // let posts = data.graphql.user.edge_owner_to_timeline_media.edges;
      // TODO: call appendPosts with ig posts
    });
}

function appendPosts(posts) {
  // TODO: Append posts using a loop
}

function appendProfileInfo(userInfo) {
  // TODO Append IG profile info like username, full name, mail, biography, profile picture, etc. 
}

fetchInstagramPosts("erhvervsakademiaarhus");