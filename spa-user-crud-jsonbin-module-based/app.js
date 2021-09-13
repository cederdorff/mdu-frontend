import Router from "./src/scripts/router.js";
import userService from "./src/scripts/users-service.js";

// init router
const router = new Router("users");

window.createUser = () => userService.create();
window.selectUser = (id) => userService.selectedUser(id);
window.deleteUser = (id) => console.log(id);