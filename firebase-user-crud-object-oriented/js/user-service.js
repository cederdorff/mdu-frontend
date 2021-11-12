import { db } from "./firebase-service.js";
import {
	collection,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	addDoc,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

export default class UserService {
	constructor() {
		this.usersRef = collection(db, "users");
		this.read();
	}

	read() {
		// ========== READ ==========
		// watch the database ref for changes
		onSnapshot(this.usersRef, snapshot => {
			// mapping snapshot data from firebase in to user objects
			this.users = snapshot.docs.map(doc => {
				const user = doc.data();
				user.id = doc.id;
				return user;
			});
			this.appendUsers(this.users);
		});
	}

	// append users to the DOM
	appendUsers(users) {
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

	getUser(id) {
		const user = this.users.find(user => user.id == id);
		return user;
	}
	// ========== CREATE ==========
	// add a new user to firestore (database)
	create(name, mail) {
		const newUser = {
			name: name,
			mail: mail,
		};
		console.log(newUser);
		addDoc(this.usersRef, newUser);
	}

	// ========== UPDATE ==========
	update(id, name, mail) {
		const userToUpdate = {
			name: name,
			mail: mail,
		};

		const userRef = doc(this.usersRef, id);
		updateDoc(userRef, userToUpdate);
	}

	// ========== DELETE ==========
	delete(id) {
		const docRef = doc(this.usersRef, id);
		deleteDoc(docRef);
	}
}
