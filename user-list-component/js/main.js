import UserList from "./user-list.js";

const app = document.querySelector("#app");
const userList = new UserList(app);
userList.init();