class PersonsService {
  constructor() {}

  async loadPersons() {
    let response = await fetch("https://randomuser.me/api/?results=9");
    let data = await response.json();
    return data.results;
  }
}

const personService = new PersonsService();
export default personService;