import { navigateTo } from "./router.js";
console.log("app.js is running!");

window.login = () => {
    const mail = document.querySelector("#login-mail").value;
    const password = document.querySelector("#login-password").value;

    if (mail === "race@eaaa.dk" && password === "test01") {
        localStorage.setItem("userIsAuthenticated", true);
        document.querySelector(".login-message").innerHTML = "";
        navigateTo("#/");
    } else {
        document.querySelector(".login-message").innerHTML = "User not found. Wrong mail og password.";
    }
}

window.logout = () => {
    localStorage.removeItem("userIsAuthenticated");
    navigateTo("#/login");
}