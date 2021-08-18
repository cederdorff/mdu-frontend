import personService from "../services/persons.js";
export default class PersonsPage {
  constructor() {
    this.template();
    this.personsService = personService;
    this.personsService.loadPersons().then(persons => this.appendPersons(persons));
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="persons" class="page">
        <header class="topbar">
          <h2>Persons</h2>
        </header>
        <div id="grid-persons" class="grid-container"></div>
      </section>
    `;
  }

  appendPersons(persons) {
    for (let person of persons) {
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