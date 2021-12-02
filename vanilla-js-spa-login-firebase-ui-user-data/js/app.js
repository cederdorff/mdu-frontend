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
	getDoc,
	setDoc
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

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
	showLoader(false);
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
	appendUsers(_users);
	showLoader(false);
});

// append users to the DOM
function appendUsers(users) {
	let htmlTemplate = "";
	for (const user of users) {
		htmlTemplate += /*html*/ `
    <article>
		<img src="${user.img}">
      <h3>${user.name}</h3>
      <p><a href="mailto:${user.mail}">${user.mail}</a></p>
    </article>
    `;
	}
	document.querySelector("#grid-users").innerHTML = htmlTemplate;
}

async function getUserData() {
	const authUser = _auth.currentUser;
	const docRef = doc(_usersRef, authUser.uid);
	const docSnap = await getDoc(docRef);
	const userData = docSnap.data();

	return {
		...authUser,
		...userData
	};
}

async function appendUserData() {
	const user = await getUserData();
	document.querySelector("#name").value = user.name || user.displayName;
	document.querySelector("#mail").value = user.email;
	document.querySelector("#birthdate").value = user.birthdate || "";
	document.querySelector("#hairColor").value = user.hairColor || "";
	document.querySelector("#imagePreview").src = user.img || "img/placeholder.jpg";
}

async function updateUser() {
	showLoader(true);
	const userToUpdate = {
		name: document.querySelector("#name").value,
		birthdate: document.querySelector("#birthdate").value,
		hairColor: document.querySelector("#hairColor").value,
		img: document.querySelector("#imagePreview").src
	};
	const userRef = doc(_usersRef, _auth.currentUser.uid);
	await setDoc(userRef, userToUpdate, { merge: true });
	showLoader(false);
}

// ========== Prieview image function ========== //
function previewImage(file, previewId) {
	if (file) {
		let reader = new FileReader();
		reader.onload = function (event) {
			document.querySelector("#" + previewId).setAttribute("src", event.target.result);
		};
		reader.readAsDataURL(file);
	}
}

// =========== attach events =========== //
document.querySelector("#btn-logout").onclick = () => logout();
window.previewImage = (file, id) => previewImage(file, id);
window.updateUser = () => updateUser();
document.querySelector("#imagePreview").onclick = () => document.querySelector("#imgFile").click();
