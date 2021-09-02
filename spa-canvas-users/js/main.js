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
    console.log(_users);
}


function appendUsers(usersArray) {
    let html = "";

    for (const userObject of usersArray) {
        html += /*html*/`
            <article>
                <img src="${userObject.avatarUrl}">
                <h2>${userObject.name}</h2>
                <a href="mailto:${userObject.email}">${userObject.email}</a>
                <p>${userObject.enrollmentType.replace("Enrollment", "")}</p>
                <p>Course: ${userObject.course}</p>
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