const firebaseConfig = {
  apiKey: "AIzaSyCI_VTBj8inrJWIjIYf_Y7bBpT9aRRQS1o",
  authDomain: "user-app-289f1.firebaseapp.com",
  databaseURL: "https://user-app-289f1.firebaseio.com",
  projectId: "user-app-289f1",
  storageBucket: "user-app-289f1.appspot.com",
  messagingSenderId: "438369021654",
  appId: "1:438369021654:web:8138ce7351d51603c0a377"
};

firebase.initializeApp(firebaseConfig);
const _db = firebase.firestore();
const _userRef = _db.collection("users");

let _selectedUserId = "";
let _selectedImgFile = "";

// ========== READ ==========
// watch the database ref for changes
_userRef.onSnapshot(function (snapshotData) {
  let users = [];
  snapshotData.forEach(function (doc) {
    let user = doc.data();
    user.id = doc.id;
    users.push(user);
  });
  appendUsers(users);
});


function appendUsers(users) {
  let htmlTemplate = "";
  for (let user of users) {
    htmlTemplate += /*html*/`
      <article>
        <h2>${user.name}</h2>
        <img src="${user.img || 'img/placeholder.jpg'}">
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
function createUser() {
  // references to the input fields
  let nameVal = document.querySelector('#name').value;
  let mailVal = document.querySelector('#mail').value;
  let imageSrc = document.querySelector('#imagePreview').src;

  // TODO: create a new object called newUser with the properties: name, mail & img. 
  // Add newUser to _userRef (cloud firestore)
  // make sure to nagivate to home: navigateTo("home");
  // EXTRA: reset input field values
}

// ========== UPDATE ==========

function selectUser(id, name, mail, img) {
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  let imageInput = document.querySelector('#imagePreviewUpdate');
  nameInput.value = name;
  mailInput.value = mail;
  imageInput.src = img;
  _selectedUserId = id;
  navigateTo("edit");
}

function updateUser() {
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  let imageInput = document.querySelector('#imagePreviewUpdate');

  // TODO: create a userToUpdate object and update _userRef (cloud firestore)
  // make sure to nagivate to home
}

// ========== DELETE ==========
function deleteUser(id) {
  // TODO: delete user by the given id
}

// doing the magic - image preview
function previewImage(file, previewId) {
  if (file) {
    _selectedImgFile = file;
    let reader = new FileReader();
    reader.onload = event => {
      document.querySelector('#' + previewId).setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }
}