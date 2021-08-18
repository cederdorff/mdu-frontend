// import your hideAllPages
import HomePage from "./pages/home.js";
import PersonsPage from "./pages/persons.js";

// import your services
import spaService from "./services/spa.js";

// Declare and init pages
let homePage = new HomePage();
let personsPage = new PersonsPage();

// init services
spaService.init();

window.pageChange = () => spaService.pageChange();