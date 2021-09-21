import User from "./user.js";

// ========== GLOBAL VARIABLES ==========
let _users = [];
const _baseUrl = "https://api.jsonbin.io/v3/b/6149a5484a82881d6c52ead4";
const _headers = {
  "X-Master-Key": "$2b$10$Uf1lbMtIPrrWeneN3Wz6JuDcyBuOz.1LbHiUg32QexCCJz3nOpoS2",
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

  for (const user of data.record) {
    const newUser = new User(user.id, user.name, user.mail, user.birthDate, user.img);
    _users.push(newUser);
  }
  appendUsers(_users);
}

loadUsers();

function appendUsers(users) {
  let html = "";
  for (const user of users) {
    html += user.getHtmlTemplate();
  }
  document.querySelector("#content").innerHTML = html;
}

