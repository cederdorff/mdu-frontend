"use strict";

async function loadData() {
  let response = await fetch("./data/data.json");
  let data = await response.json();
  console.log(data);
  appendData(data);
}

loadData();


function getImageUrl(item) {
  if (item.Files.length >= 1) {
    console.log(item.Files);
    return item.Files[0].Uri;
  }
}

// Adds persons to the DOM by giving parameter, persons
function appendData(items) {
  let html = "";
  for (let item of items) { // looping trough all persons
    //creating person data, HTML tags and adding to the DOM, the element #gridPersons
    html += /*html*/`
      <article>
        <h2>${item.Name}</h2>
        <p>${item.Category.Name}</p>
        <img src="${getImageUrl(item)}">
      </article>
      `;
  }

  document.querySelector("#content").innerHTML = html;
}