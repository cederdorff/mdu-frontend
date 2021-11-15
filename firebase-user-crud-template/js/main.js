import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getFirestore,
	collection,
	onSnapshot
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
// Initialize Firebase
initializeApp(firebaseConfig);

// reference to database
const _db = getFirestore();
// reference to users collection in database
const _usersRef = collection(_db, "users");
// global variable: users array & selectedUserId
let _users = [];
let _selectedUserId = "";

// ========== READ ==========

// onSnapshot: listen for realtime updates
onSnapshot(_usersRef, snapshot => {});

// append users to the DOM
function appendUsers(users) {}

// ========== CREATE ==========
// add a new user to firestore (database)
function createUser() {}

// ========== UPDATE ==========

function selectUser(id) {}

function updateUser() {}

// ========== DELETE ==========
function deleteUser(id) {}

// =========== Loader functionality =========== //

function showLoader(show = true) {
	const loader = document.querySelector("#loader");
	if (show) {
		loader.classList.remove("hide");
	} else {
		loader.classList.add("hide");
	}
}

// =========== attach events =========== //
