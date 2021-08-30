export default class PersonsService {
  constructor() {
    this.loadPersons();
  }

  async loadPersons() {
    let response = await fetch("https://randomuser.me/api/?results=9");
    let data = await response.json();
    this.appendPersons(data.results);
  }

  appendPersons(persons) {
    for (let person of persons) { // looping trough all persons
      //creating person data, HTML tags and adding to the DOM, the element #gridPersons
      document.querySelector("#grid-persons").innerHTML += /*html*/ `
        <article>
          <img src="${person.picture.large}">
          <h4>${person.name.first} ${person.name.last}</h4>
          <p><a href="mailto:${person.email}">${person.email}</a></p>
        </article>
        `;
    }
  }
}