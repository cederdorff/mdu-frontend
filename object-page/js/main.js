"use strict"; // to enable strict mode and modern JavaScript functionality

// a page declared as an object
let page = {
  title: "My First Page",
  date: "2021-01-29",
  content: "Yaaay, this is my first page for my portfolio site",
  featuredImage: "https://avatars3.githubusercontent.com/u/6738394"
}

console.log(page);

// append the object to the DOM
document.querySelector("main").innerHTML +=/*html*/ `
    <h1>${page.title}</h1>
    <p>${page.content}</p>
    <img src="${page.featuredImage}">
`;