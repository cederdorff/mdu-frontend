import { navigateTo } from "./router.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getAuth,
	onAuthStateChanged,
	signOut
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

import {
	getFirestore,
	collection,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	addDoc
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

import Glide from "https://cdn.skypack.dev/@glidejs/glide";

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
// Initialize Firebase (modular)
initializeApp(firebaseConfig);
const _auth = getAuth();

// Initialize Firebase UI (non modular)
firebase.initializeApp(firebaseConfig);
let _firebaseUI;

// ========== FIREBASE AUTH ========== //
// Listen on authentication state change

onAuthStateChanged(_auth, user => {
	console.log(user);
	if (user) {
		userAuthenticated(user);
	} else {
		// User is signed out
		userNotAuthenticated();
	}
});

function userAuthenticated(user) {
	appendUserData(user);
	navigateTo("#/");
}

function userNotAuthenticated() {
	navigateTo("#/login");

	// Firebase UI configuration
	const uiConfig = {
		credentialHelper: firebaseui.auth.CredentialHelper.NONE,
		signInOptions: [
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID
		],
		signInSuccessUrl: "#/"
	};
	// Init Firebase UI Authentication
	if (!_firebaseUI) {
		_firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
	}
	_firebaseUI.start("#firebaseui-auth-container", uiConfig);
	showLoader(false);
}

function appendUserData(user) {
	console.log(user);
	document.querySelector("#user-data").innerHTML = /*html*/ `
    <img class="profile-img" src="${user.photoURL || "img/placeholder.jpg"}">
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}

function logout() {
	signOut(_auth);
}

function showLoader(show) {
	let loader = document.querySelector("#loader");
	if (show) {
		loader.classList.remove("hide");
	} else {
		loader.classList.add("hide");
	}
}

// =========== reading from collection (modular v9) =========== //

// reference to database
const _db = getFirestore();
// reference to users collection in database
const _usersRef = collection(_db, "users");
let _users = [];

// ========== READ ==========

// onSnapshot: listen for realtime updates

onSnapshot(_usersRef, snapshot => {
	// mapping snapshot data from firebase in to user objects
	_users = snapshot.docs.map(doc => {
		const user = doc.data();
		user.id = doc.id;
		return user;
	});
	console.log(_users);
	initSlider(_users);
	showLoader(false);
});

function initSlider(users) {
	let htmlTemplate = "";
	for (const user of users) {
		htmlTemplate += /*html*/ `
		<li class="glide__slide">
			<img src="${user.img}">
      		<h3>${user.name}</h3>
		</li>
    `;
	}
	document.querySelector("#users-slider").innerHTML = htmlTemplate;
	new Glide(".glide", { autoplay: 3000, hoverpause: false, perView: 5, rewind: true }).mount();
}

// =========== attach events =========== //
document.querySelector("#btn-logout").onclick = () => logout();
