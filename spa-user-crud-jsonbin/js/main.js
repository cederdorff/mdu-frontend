// ========== GLOBAL VARIABLES ==========
let _users = [];
let _selectedUserId;
const _baseUrl = "https://api.jsonbin.io/v3/b/61138ef2d5667e403a3fb6a1";
const _headers = {
  "X-Master-Key": "$2b$10$iAOLguBJ8cd9y87RJTcXy.hlVPE8tVaiaURQ1q9DJH2YLmj.4pmhq",
  "Content-Type": "application/json"
};

// ========== READ ==========

/**
 * Fetchs person data from jsonbin
 */
async function loadUsers() {
  const url = _baseUrl + "/latest"; // make sure to get the latest version
  const response = await fetch(url, {
    headers: _headers
  });
  const data = await response.json();
  console.log(data);
  _users = data.record;
  appendUsers(_users);
}
loadUsers();

/**
 * Appends users to the DOM
 * @param {Array} users 
 */
function appendUsers(users) {
  let htmlTemplate = "";
  for (const user of users) {
    htmlTemplate += /*html*/ `
      <article>
        <h3>${user.name}</h3>
        <p><a href="mailto:${user.mail}">${user.mail}</a></p>
        <button onclick="selectUser(${user.id})">Update</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  showLoader(false);
}

// ========== CREATE ==========

/**
 * Creates a new user with properties: name, mail & id
 */
async function createUser() {
  showLoader(true);
  // references to input fields
  let nameInput = document.querySelector("#name");
  let mailInput = document.querySelector("#mail");
  // dummy generated user id
  const userId = Date.now();
  // declaring a new user object
  const newUser = {
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
  navigateTo("#/");
}

// ========== UPDATE ==========

/**
 * Finds a display selected user by given. 
 * @param id 
 */
function selectUser(id) {
  _selectedUserId = id;
  // find user by given user id
  const user = _users.find(user => user.id == _selectedUserId);
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  // set indout values with selected user values 
  nameInput.value = user.name;
  mailInput.value = user.mail;
  navigateTo("#/update");
}

/**
 * Updates user with values from input fields
 */
async function updateUser() {
  showLoader(true);
  // references to input fields
  const nameInput = document.querySelector("#name-update");
  const mailInput = document.querySelector("#mail-update");
  // find user to update by given user id
  const userToUpdate = _users.find(user => user.id === _selectedUserId);
  // update values of user in array
  userToUpdate.name = nameInput.value;
  userToUpdate.mail = mailInput.value;
  // wait for update
  await updateJSONBIN(_users);
  // reset
  nameInput.value = "";
  mailInput.value = "";
  //navigating back
  navigateTo("#/");
}

// ========== DELETE ==========
/**
 * Deletes user by given user id
 * @param id 
 */
async function deleteUser(id) {
  showLoader(true);
  _users = _users.filter(user => user.id !== id);
  await updateJSONBIN(_users);
}

// ========== Services ==========
/**
 * Updates the data source on jsonbin with a given users arrays
 * @param {Array} users 
 */
async function updateJSONBIN(users) {
  // put users array to jsonbin
  const response = await fetch(_baseUrl, {
    method: "PUT",
    headers: _headers,
    body: JSON.stringify(users)
  });
  // waiting for the result
  const result = await response.json(); // the new updated users array from jsonbin
  console.log(result);
  //updating the DOM with the new fetched users
  appendUsers(result.record);
}

// ========== Loader ==========
/**
 * Shows or hides loader by giden parameter: true/false
 * @param {boolean} show 
 */
function showLoader(show) {
  const loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}