import {
  firebaseDB
} from "./firebase-service.js";

export default class UserService {
  constructor() {
    this.userRef = firebaseDB.collection("users");
    this.read();
  }

  read() {
    // ========== READ ==========
    // watch the database ref for changes
    this.userRef.onSnapshot(snapshotData => {
      let users = [];
      snapshotData.forEach(doc => {
        let user = doc.data();
        user.id = doc.id;
        users.push(user);
      });
      this.appendUsers(users);
    });
  }

  // append users to the DOM
  appendUsers(users) {
    let htmlTemplate = "";
    for (let user of users) {
      htmlTemplate += `
      <article>
        <h2>${user.name}</h2>
        <img src="${user.img}">
        <p><a href="mailto:${user.mail}">${user.mail}</a></p>
        <button onclick="selectUser('${user.id}','${user.name}', '${user.mail}', '${user.img}')">Update</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </article>
      `;
    }
    document.querySelector('#user-container').innerHTML = htmlTemplate;
  }

  // ========== CREATE ==========
  // add a new user to firestore (database)
  create(name, mail, img) {}

  // ========== UPDATE ==========
  update(id, name, mail, img) {}

  // ========== DELETE ==========
  delete(id) {}
}