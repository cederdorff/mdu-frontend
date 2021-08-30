"use strict";

async function loadData() {
  let response = await fetch("https://randomuser.me/api/?results=9");
  let data = await response.json();
  console.log(data);
  appendPersons(data.results);
}

loadData();


// Adds persons to the DOM by giving parameter, persons
function appendPersons(persons) {
  for (let person of persons) { // looping trough all persons
    console.log(person);
    //creating person data, HTML tags and adding to the DOM, the element #gridPersons
    document.querySelector("#grid-persons").innerHTML += /*html*/`
      <article>
      <img src="${person.picture.large}">
      <h4>${person.name.first} ${person.name.last}</h4>
      <p><a href="mailto:${person.email}">${person.email}</a></p>
      </article>
      `;
  }
}