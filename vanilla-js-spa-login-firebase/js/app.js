import { navigateTo } from "./router.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCI_VTBj8inrJWIjIYf_Y7bBpT9aRRQS1o",
    authDomain: "user-app-289f1.firebaseapp.com",
    databaseURL: "https://user-app-289f1.firebaseio.com",
    projectId: "user-app-289f1",
    storageBucket: "user-app-289f1.appspot.com",
    messagingSenderId: "438369021654",
    appId: "1:438369021654:web:8138ce7351d51603c0a377"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const _auth = getAuth();

onAuthStateChanged(_auth, user => {
    console.log(user);
    if (user) {
        navigateTo("#/");
    } else {
        // User is signed out
        if (location.hash == "#/signup") {
            navigateTo("#/signup");
        } else {
            navigateTo("#/login");
        }
    }
    showLoader(false);
});

function login(event) {
    showLoader(true);
    event.preventDefault();

    signInWithEmailAndPassword(_auth, event.target.mail.value, event.target.password.value)
        .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            document.querySelector(".login-message").innerHTML = "";
            showLoader(false);
        })
        .catch(error => {
            console.log(error);
            document.querySelector(".login-message").innerHTML = error.message;
            showLoader(false);
        });
}

function logout() {
    signOut(_auth);
}

function signup(event) {
    showLoader(true);

    event.preventDefault();
    createUserWithEmailAndPassword(_auth, event.target.mail.value, event.target.password.value)
        .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            document.querySelector(".signup-message").innerHTML = "";
            showLoader(false);
        })
        .catch(error => {
            console.log(error);
            document.querySelector(".signup-message").innerHTML = error.message;
            showLoader(false);
        });
}

function showLoader(show) {
    let loader = document.querySelector("#loader");
    if (show) {
        loader.classList.remove("hide");
    } else {
        loader.classList.add("hide");
    }
}

// =========== attach events =========== //
document.querySelector("#form-login").onsubmit = event => login(event);
document.querySelector("#btn-logout").onclick = () => logout();
document.querySelector("#form-signup").onsubmit = event => signup(event);
