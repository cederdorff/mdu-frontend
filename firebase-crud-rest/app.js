// ====== REST SERVICE ("model") ====== //
const endpoint = "https://race-crud-rest-default-rtdb.firebaseio.com";

// === READ (GET) === //
async function getUsers() {
    const res = await fetch(`${endpoint}/users.json`);
    const data = await res.json();
    const userList = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
    return userList;
}

async function getUser(id) {
    const res = await fetch(`${endpoint}/users/${id}.json`);
    const data = await res.json();
    return data;
}

// === CREATE (POST) === //
async function createUser(name, mail, image) {
    const newUser = { name, mail, image };
    const userAsJson = JSON.stringify(newUser);
    const res = await fetch(`${endpoint}/users.json`, { method: "POST", body: userAsJson });
    console.log(res);
}

// === UPDATE (PUT) === //
async function updateUser(id, name, mail, image) {
    const userToUpdate = { name, mail, image };
    const userAsJson = JSON.stringify(userToUpdate);
    const res = await fetch(`${endpoint}/users/${id}.json`, { method: "PUT", body: userAsJson });
    console.log(res);
}

// === DELETE (DELETE) === //
async function deleteUser(id) {
    const res = await fetch(`${endpoint}/users/${id}.json`, { method: "DELETE" });
    console.log(res);
}

// ====== REST SERVICE END ====== //

// ====== EVENTS ====== ("controller+view") //

let selectedUserId;

function appendUsers(userList) {
    let html = "";

    for (const user of userList) {
        html += /*html*/ `
             <article>
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.mail}">${user.mail}</a>
                 <div>
                    <button class="btn-update-user" data-id="${user.id}">Update</button>
                    <button class="btn-delete-user" data-id="${user.id}">Delete</button>
                </div>
            </article>
        `;
    }

    document.querySelector("#users-grid").innerHTML = html;
    addUserClickEvents();
}

function addUserClickEvents() {
    //delete event
    document.querySelectorAll(".btn-delete-user").forEach(
        btn =>
            (btn.onclick = async () => {
                const userId = btn.getAttribute("data-id");
                const shouldDelete = confirm("Are you sure you want to delete this user?");
                if (shouldDelete) {
                    await deleteUser(userId);
                    onUsersListChanged();
                }
            })
    );

    //update event
    document.querySelectorAll(".btn-update-user").forEach(
        btn =>
            (btn.onclick = async () => {
                selectedUserId = btn.getAttribute("data-id");
                const user = await getUser(selectedUserId);
                const form = document.querySelector("#form-update");
                form.name.value = user.name;
                form.mail.value = user.mail;
                form.image.value = user.image;
                form.scrollIntoView({ behavior: "smooth" });
            })
    );
}

function createSubmitEvent() {
    document.querySelector("#form-create").onsubmit = async event => {
        event.preventDefault();
        const name = event.target.name.value;
        const mail = event.target.mail.value;
        const image = event.target.image.value;
        await createUser(name, mail, image);
        onUsersListChanged();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

function updateSubmitEvent() {
    document.querySelector("#form-update").onsubmit = async event => {
        event.preventDefault();
        const name = event.target.name.value;
        const mail = event.target.mail.value;
        const image = event.target.image.value;
        await updateUser(selectedUserId, name, mail, image);
        onUsersListChanged();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

async function onUsersListChanged() {
    const users = await getUsers();
    appendUsers(users);
}

// ========= EVENTS END ====== //

// === INITIALIZE APP === //

function initApp() {
    onUsersListChanged();
    createSubmitEvent();
    updateSubmitEvent();
}

initApp();

// ====== INITIALIZE APP END ====== //
