import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getFirestore, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

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

const db = getFirestore();
const usersRef = collection(db, "users");
let users;

onSnapshot(usersRef, (snapshot) => {
  users = snapshot.docs.map((doc) => {
    const user = doc.data();
    user.id = doc.id;
    return user;
  });

  appendUsers(users);
});

// append users to the DOM
function appendUsers(users) {
  let htmlTemplate = "";
  for (let user of users) {
    htmlTemplate += /*html*/`
    <article>
    <img src="${user.img}">
      <h2>${user.name}</h2>
      <p><a href="mailto:${user.mail}">${user.mail}</a></p>
    </article>
    `;
  }
  document.querySelector('#content').innerHTML = htmlTemplate;
}