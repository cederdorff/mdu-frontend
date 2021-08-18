// import your services
import SpaService from "./services/spa.js";
import LoaderService from "./services/loader.js";
import PersonsService from "./services/persons.js";

// Declare and init services
let spaService = new SpaService("home");
let personsService = new PersonsService();
let loaderService = new LoaderService();
loaderService.show(false);

window.pageChange = function() {
  spaService.pageChange();
}