import Spa from "./services/spa-service.js";
import userService from "./services/users-service.js";
import loaderService from "./services/loader-service.js";

import UserPage from "./pages/users-page.js";
import CreatePage from "./pages/create-page.js";


// init spa service
const spaService = new Spa("users");

// init pages
const usersPage = new UserPage(document.querySelector("#users"));
const createPage = new CreatePage(document.querySelector("#create"));


window.selectUser = (id) => usersPage.showEditPage(id);
window.deleteUser = (id) => usersPage.showDeleteDialog(id);

window.createUser = () => createPage.createUser();