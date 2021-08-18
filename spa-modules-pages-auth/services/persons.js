class PersonsService {
  constructor() {}

  async loadPersons() {
    let response = await fetch("https://randomuser.me/api/?results=9");
    let jsonData = await response.json();
    return jsonData.results;
  }
}

const personService = new PersonsService();
export default personService;