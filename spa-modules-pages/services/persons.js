import loaderService from "./loader.js";
class PersonsService {
  constructor() {
    this.loaderService = loaderService;
  }

  async loadPersons() {
    let response = await fetch("https://randomuser.me/api/?results=9");
    let data = await response.json();
    this.loaderService.show(false);
    return data.results;
  }
}

const personService = new PersonsService();
export default personService;