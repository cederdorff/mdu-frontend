"use strict";

async function loadPersons() {
  let response = await fetch("https://randomuser.me/api/?results=9");
  let jsonData = await response.json();
  appendPersons(jsonData.results);
}

loadPersons();

function appendPersons(persons) {
  for (let person of persons) {
    document.querySelector("#grid-persons").innerHTML += `
      <article>
      <img src="${person.picture.large}">
      <h4>${person.name.first} ${person.name.last}</h4>
      <p><a href="mailto:${person.email}">${person.email}</a></p>
      </article>
      `;
  }
  showLoader(false);
}