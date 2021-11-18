import { navigateTo } from "./router.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

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
		console.log("heh");
		if (location.hash == "#/signup") {
			navigateTo("#/signup");
		} else {
			navigateTo("#/login");
		}
	}
});

function login() {
	const mail = document.querySelector("#login-mail").value;
	const password = document.querySelector("#login-password").value;

	signInWithEmailAndPassword(_auth, mail, password)
		.then(userCredential => {
			// Signed in
			const user = userCredential.user;
			console.log(user);
			document.querySelector(".login-message").innerHTML = "";
		})
		.catch(error => {
			console.log(error);
			document.querySelector(".login-message").innerHTML = error.message;
		});
}

function logout() {
	signOut(_auth);
}

function signup() {
	const mail = document.querySelector("#signup-mail").value;
	const password = document.querySelector("#signup-password").value;
	createUserWithEmailAndPassword(_auth, mail, password)
		.then(userCredential => {
			// Signed in
			const user = userCredential.user;
			console.log();
		})
		.catch(error => {
			console.log(error);
			document.querySelector(".signup-message").innerHTML = error.message;
		});
}

// =========== attach events =========== //
document.querySelector("#btn-login").onclick = () => login();
document.querySelector("#btn-logout").onclick = () => logout();
document.querySelector("#btn-signup").onclick = () => signup();
