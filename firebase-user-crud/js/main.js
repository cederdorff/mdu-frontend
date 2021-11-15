import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
	getFirestore,
	collection,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	addDoc
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
onSnapshot(_usersRef, snapshot => {
	// mapping snapshot data from firebase in to user objects
	_users = snapshot.docs.map(doc => {
		const user = doc.data();
		user.id = doc.id;
		return user;
	});
	appendUsers(_users);
	showLoader(false);
});

// append users to the DOM
function appendUsers(users) {
	let htmlTemplate = "";
	for (const user of users) {
		htmlTemplate += /*html*/ `
    <article>
      <h3>${user.name}</h3>
      <p><a href="mailto:${user.mail}">${user.mail}</a></p>
      <button onclick="selectUser('${user.id}')">Update</button>
      <button onclick="deleteUser('${user.id}')">Delete</button>
    </article>
    `;
	}
	document.querySelector("#content").innerHTML = htmlTemplate;
}

// ========== CREATE ==========
// add a new user to firestore (database)
function createUser() {
	// references to the input fields
	let nameInput = document.querySelector("#name");
	let mailInput = document.querySelector("#mail");

	const newUser = {
		name: nameInput.value,
		mail: mailInput.value
	};
	if (validate(newUser)) {
		addDoc(_usersRef, newUser);
	} else {
		alert("Please type a real name and mail.");
	}
}

// ========== UPDATE ==========
function selectUser(id) {
	_selectedUserId = id;
	const user = _users.find(user => user.id == _selectedUserId);
	// references to the input fields
	document.querySelector("#name-update").value = user.name;
	document.querySelector("#mail-update").value = user.mail;
	//scroll to update form
	document.querySelector("#form-update").scrollIntoView({ behavior: "smooth" });
}

function updateUser() {
	const userToUpdate = {
		name: document.querySelector("#name-update").value,
		mail: document.querySelector("#mail-update").value
	};
	if (validate(userToUpdate)) {
		const userRef = doc(_usersRef, _selectedUserId);
		updateDoc(userRef, userToUpdate);
	} else {
		alert("Please type a real name and mail.");
	}
}

// ========== DELETE ==========
function deleteUser(id) {
	const docRef = doc(_usersRef, id);
	deleteDoc(docRef);
}

// =========== Helper functions =========== //
function validate({ name, mail }) {
	if (name.length > 0 && /\S+@\S+\.\S+/.test(mail)) {
		return true;
	} else {
		return false;
	}
}

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
window.selectUser = id => selectUser(id);
window.deleteUser = id => deleteUser(id);
document.querySelector("#btn-update").onclick = () => updateUser();
document.querySelector("#btn-create").onclick = () => createUser();
