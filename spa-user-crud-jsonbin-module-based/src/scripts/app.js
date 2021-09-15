// imports 
import Router from "./router.js";
import UsersComponent from "./users-component.js";


// init users component
const app = document.querySelector("#app");
const usersComponent = new UsersComponent(app);

// init router
const router = new Router(app, "#/users");

// events - global scope
window.createUser = async () => {
    let name = document.querySelector("#name").value;
    let mail = document.querySelector("#mail").value;
    await usersComponent.create(name, mail);
    router.navigateTo("#/users");
}

window.selectUser = (userId) => {
    usersComponent.setSelectedUser(userId);
    router.navigateTo("#/update");
}

window.updateUser = async () => {
    await usersComponent.update();
    router.navigateTo("#/users");
}

window.deleteUser = (userId) => {
    const deleteUser = confirm("Do you want to delete user?");
    if (deleteUser) {
        usersComponent.delete(userId);
    }
}