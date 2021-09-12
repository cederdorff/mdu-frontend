import Spa from "./spa-service.js";
import userService from "./users-service.js";

// init spa service
const spaService = new Spa("users");

window.selectUser = (id) => userService.selectedUser(id);
window.deleteUser = (id) => console.log(id);