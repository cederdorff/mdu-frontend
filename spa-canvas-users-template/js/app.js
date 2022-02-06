"use strict";

/* ---------- Global Variables ---------- */
let _users = [];
let _selectedUserId;

/* -------------------------------------- */

async function initApp() {
    await fetchUsers();
    appendUsers(_users);
}

initApp();

async function fetchUsers() {
    const url = "https://cederdorff.github.io/mdu-frontend/canvas-users/data/users.json";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    _users = data;
}

function appendUsers(usersArray) {
    let html = "";
    for (const userObject of usersArray) {
        html += /*html*/ `
            <article>
                <img src="${userObject.image}" onclick="showDetailView('${userObject.id}')">
                <h2>${userObject.name}</h2>
                <a href="mailto:${userObject.mail}">${userObject.mail}</a>
                <p>${userObject.enrollmentType.replace("Enrollment", "")}</p>
                <p>Course: ${userObject.course}</p>
                <button onclick="selectUser('${userObject.id}')">Update</button>
                <button onclick="deleteUser('${userObject.id}')">Delete</button>
            </article>
        `;
    }
    document.querySelector("#users-container").innerHTML = html;
}

function orderBy(value) {
    if (value === "name") {
        sortByName();
    } else if (value === "sortableName") {
        sortBySortableName();
    }
}

function sortByName() {}

function sortBySortableName() {}

function filterByEnrollment(type) {}

function filterByCourse(course) {}

function search(value) {}

function resetFilterByCourse() {
    document.querySelector("#filterByCourse").value = "all";
}

function resetFilterByEnrollment() {
    document.querySelector("#filterByEnrollment").value = "all";
}

function addNewUser() {}

function generateSortableName(name) {
    const nameStringArray = name.split(" ");
    const lastname = nameStringArray.pop();
    const firstnames = nameStringArray.join(" ");
    return `${lastname}, ${firstnames}`;
}

function selectUser(id) {
    _selectedUserId = id;
    const userToEdit = _users.find(user => user.id == id);
    document.querySelector("#nameEdit").value = userToEdit.name;
    document.querySelector("#courseEdit").value = userToEdit.course;
    document.querySelector("#mailEdit").value = userToEdit.mail;
    document.querySelector("#enrollmentTypeEdit").value = userToEdit.enrollmentType;
    document.querySelector("#imgEdit").value = userToEdit.image;
    navigateTo("#/update");
}

function updateUser() {}

function deleteUser(id) {}

function showDetailView(id) {
    const userObject = _users.find(user => user.id == id);
    document.querySelector("#detailView h2").innerHTML = userObject.name;
    document.querySelector("#detailViewContainer").innerHTML = /*html*/ `
        <img src="${userObject.image}" onclick="showDetailView('${userObject.id}')">
        <article>
            <h2>${userObject.name}</h2>
            <p>Sortable name: ${userObject.sortableName}</p>
            <a href="mailto:${userObject.mail}">${userObject.mail}</a>
            <p>${userObject.enrollmentType.replace("Enrollment", "")}</p>
            <p>Course: ${userObject.course}</p>
            <p>User id: ${userObject.id}</p>
        </article>
    `;
    navigateTo("#/user");
}

if (!_selectedUserId) {
    navigateTo("#/");
}
