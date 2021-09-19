import Router from "./services/router.js";

import UsersPage from "./pages/users-page.js";
import CreatePage from "./pages/create-page.js";
import UpdatePage from "./pages/update-page.js";

// app - dom element
const app = document.querySelector("#app");
const pages = document.querySelector("#pages");

// init pages
const usersPage = new UsersPage(pages);
const createPage = new CreatePage(pages);
const updatePage = new UpdatePage(pages);

// init spa service
const router = new Router(app, "#/users");