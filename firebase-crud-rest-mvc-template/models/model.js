export default class Model {
    constructor() {
        this.endpoint = "https://race-crud-rest-default-rtdb.firebaseio.com";
    }
    // === READ & FETCH USERS (GET) === //
    async fetchUsers() {
        const res = await fetch(`${this.endpoint}/users.json`);
        const data = await res.json();
        const userList = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array
        return userList;
    }

    async getUsers() {
        return await this.fetchUsers();
    }

    async getUser(id) {
        const res = await fetch(`${this.endpoint}/users/${id}.json`);
        const data = await res.json();
        return data;
    }

    // === CREATE (POST) === //
    // to do

    // === UPDATE (PUT) === //
    // to do

    // === DELETE (DELETE) === //
    // to do
}
