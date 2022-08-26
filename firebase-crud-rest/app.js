const endpoint = "https://race-crud-rest-default-rtdb.firebaseio.com";

// === READ (GET) === //
async function getUsers() {
    const res = await fetch(endpoint + "/users.json");
    const data = await res.json();
    const userList = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
    return userList;
}

// === CREATE (POST) === //
async function createUser(name, mail, image) {
    const newUser = { name, mail, image };
    const userAsJson = JSON.stringify(newUser);
    const res = await fetch(endpoint + "/users.json", { method: "POST", body: userAsJson });
    console.log(res);
}

// === UPDATE (PUT) === //
async function updateUser(id, name, mail, image) {
    const userToUpdate = { name, mail, image };
    const userAsJson = JSON.stringify(userToUpdate);
    const res = await fetch(endpoint + `/users/${id}.json`, { method: "PUT", body: userAsJson });
    console.log(res);
}

// === DELETE (DELETE) === //
async function deleteUser(id) {
    const res = await fetch(endpoint + `/users/${id}.json`, { method: "DELETE" });
    console.log(res);
}

// === HELPER FUNCTIONS === //
function appendUsers(userList) {
    let html = "";

    for (const user of userList) {
        console.log(user);

        html += /*html*/ `
             <article>
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.mail}">${user.mail}</a>
            </article>
        `;
    }

    document.querySelector("#users-grid").innerHTML = html;
}

// === EVENTS === //

// createUser(
//     "Test User2",
//     "test@test.dk",
//     "https://www.baaa.dk/media/uqxhqlzq/anne-storm-rasmussen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921534400000&format=webp"
// );

// updateUser(
//     "-NAJ_KOvHnR9t5QFSndw",
//     "Peter Hansen",
//     "p@hansen.dk",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCpn6zqmr_-INDYVUJQON4nuI62N52yWGj9U1KYPt7Tw&s"
// );

// deleteUser("-NAJ_KOvHnR9t5QFSndw");

// === INITIALIZE APP === //

async function initApp() {
    const users = await getUsers();
    appendUsers(users);
}

initApp();
