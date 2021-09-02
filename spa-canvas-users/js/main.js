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
    _users = data;
}

function appendUsers(usersArray) {
    let html = "";
    for (const userObject of usersArray) {
        html += /*html*/`
            <article>
                <img src="${userObject.avatarUrl}" onclick="showDetailView('${userObject.id}')">
                <h2>${userObject.name}</h2>
                <a href="mailto:${userObject.email}">${userObject.email}</a>
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

function sortByName() {
    _users.sort((user1, user2) => {
        return user1.name.localeCompare(user2.name);
    });
    appendUsers(_users);
}

function sortBySortableName() {
    _users.sort((user1, user2) => {
        return user1.sortableName.localeCompare(user2.sortableName);
    });
    appendUsers(_users);
}

function filterByEnrollment(type) {
    resetFilterByCourse();
    if (type === "all") {
        appendUsers(_users);
    } else {
        const results = _users.filter(user => user.enrollmentType === type);
        appendUsers(results)
    }
}

function filterByCourse(course) {
    resetFilterByEnrollment();
    if (course === "all") {
        appendUsers(_users);
    } else {
        const results = _users.filter(user => user.course === course);
        appendUsers(results);
    }
}

function search(value) {
    resetFilterByCourse();
    resetFilterByEnrollment();
    value = value.toLowerCase();
    const results = _users.filter(user => {
        const name = user.name.toLowerCase();
        if (name.includes(value)) {
            return user;
        }
    });
    appendUsers(results);
}

function resetFilterByCourse() {
    document.querySelector("#filterByCourse").value = "all";
}

function resetFilterByEnrollment() {
    document.querySelector("#filterByEnrollment").value = "all";
}

function addNewUser() {
    const name = document.querySelector("#name").value;
    const course = document.querySelector("#course").value;
    const mail = document.querySelector("#mail").value;
    const enrollmentType = document.querySelector("#enrollmentType").value;
    const img = document.querySelector("#img").value;
    const id = Date.now(); // dummy generated user id

    const newUser = {
        avatarUrl: img,
        course: course,
        createdAt: id,
        email: mail,
        enrollmentType: enrollmentType,
        id: id,
        loginId: mail,
        name: name,
        sortableName: generateSortableName(name)
    };

    _users.push(newUser);
    appendUsers(_users);
    navigateTo("users");
}

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
    document.querySelector("#mailEdit").value = userToEdit.email;
    document.querySelector("#enrollmentTypeEdit").value = userToEdit.enrollmentType;
    document.querySelector("#imgEdit").value = userToEdit.avatarUrl;
    navigateTo("update");
}

function updateUser() {
    const userToEdit = _users.find(user => user.id == _selectedUserId);
    userToEdit.name = document.querySelector("#nameEdit").value;
    userToEdit.course = document.querySelector("#courseEdit").value;
    userToEdit.email = document.querySelector("#mailEdit").value;
    userToEdit.loginId = userToEdit.email;
    userToEdit.enrollmentType = document.querySelector("#enrollmentTypeEdit").value;
    userToEdit.avatarUrl = document.querySelector("#imgEdit").value;
    userToEdit.sortableName = generateSortableName(userToEdit.name);
    appendUsers(_users);
    navigateTo("users");
}

function deleteUser(id) {
    const deleteUser = confirm("Are you sure you want to delete user?");
    if (deleteUser) {
        _users = _users.filter(user => user.id != id);
        appendUsers(_users);
    }
}

function showDetailView(id) {
    const userObject = _users.find(user => user.id == id);
    document.querySelector("#detailView h2").innerHTML = userObject.name;
    document.querySelector("#detailViewContainer").innerHTML = /*html*/`
        <img src="${userObject.avatarUrl}" onclick="showDetailView('${userObject.id}')">
        <article>
            <h2>${userObject.name}</h2>
            <p>Sortable name: ${userObject.sortableName}</p>
            <a href="mailto:${userObject.email}">${userObject.email}</a>
            <p>${userObject.enrollmentType.replace("Enrollment", "")}</p>
            <p>Course: ${userObject.course}</p>
            <p>User id: ${userObject.id}</p>
        </article>
    `;
    navigateTo("detailView");
}


if (!_selectedUserId) {
    navigateTo("users");
}

