class UserList {
    constructor(domElement) {
        this.users = [];
        this.domElement = domElement;
        this.init();
    }

    async init() {
        this.render();
        await this.fetchUsers();
        this.appendUsers();
    }

    render() {
        const htmlTemplate = /*html*/`
            <section class="user-list grid-container">   
            </section>
        `;
        this.domElement.innerHTML += htmlTemplate; // add to DOM
    }

    async fetchUsers() {
        const url = "https://cederdorff.github.io/mdu-frontend/canvas-users/data/users.json";
        const response = await fetch(url);
        const data = await response.json();
        this.users = data;
    }

    appendUsers() {
        let userList = "";
        for (const user of this.users) {
            userList += /*html*/`
            <article>
                <img src="${user.avatarUrl}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.email}">${user.email}</a>
                <p>${user.enrollmentType.replace("Enrollment", "")}</p>
                <p>Course: ${user.course}</p>
            </article>
        `;
        }
        this.domElement.querySelector(".user-list").innerHTML = userList;
    }
}

export default UserList;

