"use strict";

// ========== GLOBAL VARS ==========

let _selectedUser;
let _users = [];
const _baseUrl = "https://api.jsonbin.io/b/61138ef2d5667e403a3fb6a1";
let _headers = {
  "X-Master-Key": "$2b$10$Uf1lbMtIPrrWeneN3Wz6JuDcyBuOz.1LbHiUg32QexCCJz3nOpoS2",
  "Content-Type": "application/json",
  'X-BIN-META': false
};

// ========== READ ==========

async function loadPersons() {
  const response = await fetch(_baseUrl, {
    headers: _headers
  });
  _users = await response.json();
  console.log(_users);
  appendUsers(_users);
}
loadPersons();

function appendUsers(users) {
  let htmlTemplate = "";
  for (let user of users) {
    htmlTemplate += /*html*/ `
      <article>
        <h3>${user.name}</h3>
        <p><a href="mailto:${user.mail}">${user.mail}</a></p>
        <button onclick="selectUser('${user.id}')">Update</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  showLoader(false);
}

// ========== CREATE ==========

async function createUser() {
  showLoader(true);
  // references to input fields
  let nameInput = document.querySelector("#name");
  let mailInput = document.querySelector("#mail");
  // dummy generated user id
  const userId = Date.now();
  // declaring a new user object
  let newUser = {
    name: nameInput.value,
    mail: mailInput.value,
    id: userId
  };
  // pushing the new user object to the _users array
  _users.push(newUser);
  // wait for update
  await updateJSONBIN(_users);
  // reset
  nameInput.value = "";
  mailInput.value = "";
  //navigating back
  navigateTo("users");
  console.log("createUser DONE");
}

// ========== UPDATE ==========

function selectUser(id) {
  // find user by given user id
  _selectedUser = _users.find(user => user.id == id);
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  // set indout values with selected user values 
  nameInput.value = _selectedUser.name;
  mailInput.value = _selectedUser.mail;
  navigateTo("update");
}

async function updateUser() {
  showLoader(true);
  // references to input fields
  let nameInput = document.querySelector("#name-update");
  let mailInput = document.querySelector("#mail-update");
  // find index of the user to update
  let index = _users.findIndex(user => user.id == _selectedUser.id);
  // update values of user in array
  _users[index].name = nameInput.value;
  _users[index].mail = mailInput.value;
  // wait for update
  await updateJSONBIN(_users);
  // reset
  nameInput.value = "";
  mailInput.value = "";
  //navigating back
  navigateTo("users");
}

// ========== DELETE ==========

async function deleteUser(id) {
  showLoader(true);
  _users = _users.filter(user => user.id != id);
  await updateJSONBIN(_users);
}

// ========== Services ==========

async function updateJSONBIN(users) {
  // put users array to jsonbin
  let response = await fetch(_baseUrl, {
    method: "PUT",
    headers: _headers,
    body: JSON.stringify(users)
  });
  // waiting for the result
  let result = await response.json(); // the new updated users array from jsonbin
  console.log(result);
  //updating the DOM with the new fetched users
  appendUsers(result.data);
}