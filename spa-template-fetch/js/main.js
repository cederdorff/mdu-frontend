"use strict";

async function loadPersons() {
  let response = await fetch("https://randomuser.me/api/?results=9");
  let data = await response.json();
  appendPersons(data.results);
}

loadPersons();

function appendPersons(persons) {
  for (let person of persons) {
    document.querySelector("#grid-persons").innerHTML += /*html*/`
      <article>
        <img src="${person.picture.large}">
        <h4>${person.name.first} ${person.name.last}</h4>
        <p><a href="mailto:${person.email}">${person.email}</a></p>
      </article>
      `;
  }
  showLoader(false);
}