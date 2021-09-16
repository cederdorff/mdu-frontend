import loader from "./loader-component.js";

export default class UsersComponent {

    constructor(domElement) {
        this.domElement = domElement;
        this.baseUrl = "https://api.jsonbin.io/v3/b/61138ef2d5667e403a3fb6a1";
        this.defaultHeaders = {
            "X-Master-Key": "$2b$10$Uf1lbMtIPrrWeneN3Wz6JuDcyBuOz.1LbHiUg32QexCCJz3nOpoS2",
            "Content-Type": "application/json"
        };
        this.users = [];
        this.selectedUser;
        this.init();
    }

    async init() {
        await this.fetchUsers();
        this.appendUsers();
    }

    async fetchUsers() {
        const url = this.baseUrl + "/latest"; // make sure to get the latest version of your bin
        const response = await fetch(url, { headers: this.defaultHeaders });
        const data = await response.json();
        console.log(data);
        this.users = data.record;
        return this.users;
    }

    appendUsers() {
        let htmlTemplate = "";
        for (const user of this.users) {
            htmlTemplate += /*html*/ `
                <article>
                    <h3>${user.name}</h3>
                    <p><a href="mailto:${user.mail}">${user.mail}</a></p>
                    <button onclick="selectUser('${user.id}')">Update</button>
                    <button onclick="deleteUser('${user.id}')">Delete</button>
                </article>
                `;
        }
        this.domElement.querySelector(".users-grid").innerHTML = htmlTemplate;
        loader.show(false);
    }

    async create(name, mail) {
        // dummy generated user id
        const userId = Date.now();
        // declaring a new user object
        const newUser = {
            name: name,
            mail: mail,
            id: userId
        };
        this.users.push(newUser);
        await this.updateJsonBin();
    }

    setSelectedUser(id) {
        this.selectedUser = this.users.find(user => user.id == id);
        this.domElement.querySelector('.name-update').value = this.selectedUser.name;
        this.domElement.querySelector('.mail-update').value = this.selectedUser.mail;
    }

    async update() {
        this.selectedUser.name = this.domElement.querySelector('.name-update').value;
        this.selectedUser.mail = this.domElement.querySelector('.mail-update').value;
        await this.updateJsonBin(); // wait for update
    }

    async delete(id) {
        this.users = this.users.filter(user => user.id != id);
        await this.updateJsonBin(); // wait for update
    }

    async updateJsonBin() {
        loader.show(true);
        const response = await fetch(this.baseUrl, {
            method: "PUT",
            headers: this.defaultHeaders,
            body: JSON.stringify(this.users)
        });
        const result = await response.json();
        console.log(result);
        this.users = result.record;
        this.appendUsers();
        loader.show(false);
    }
}