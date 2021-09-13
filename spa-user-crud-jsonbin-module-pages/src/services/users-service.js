class UserService {
    constructor() {
        this.baseUrl = "https://api.jsonbin.io/v3/b/61138ef2d5667e403a3fb6a1";
        this.defaultHeaders = {
            "X-Master-Key": "$2b$10$Uf1lbMtIPrrWeneN3Wz6JuDcyBuOz.1LbHiUg32QexCCJz3nOpoS2",
            "Content-Type": "application/json"
        };
        this.users = [];
    }

    async get() {
        const url = this.baseUrl + "/latest"; // make sure to get the latest version
        const response = await fetch(url, { headers: this.defaultHeaders });
        const data = await response.json();
        console.log(data);
        this.users = data.record
        return this.users;
    }

    async create(name, mail) {
        // dummy generated user id
        const userId = Date.now();
        // declaring a new user object
        let newUser = {
            name: name,
            mail: mail,
            id: userId
        };
        this.users.push(newUser);
        console.log(this.users);
        return this.updateJsonBin();
    }

    async update(id, name, mail) {
        // find index of the user to update
        let index = this.users.findIndex(user => user.id == _selectedUser.id);
        // update values of user in array
        this.users[index].name = nameInput.value;
        this.users[index].mail = mailInput.value;
        // wait for update
        await this.updateJsonBin();
    }

    async delete(id) {
        this.users = this.users.filter(user => user.id != id);
        return this.updateJsonBin();
    }

    async updateJsonBin() {
        let response = await fetch(this.baseUrl, {
            method: "PUT",
            headers: this.defaultHeaders,
            body: JSON.stringify(this.users)
        });
        let result = await response.json();
        console.log(result);
        this.users = result.record;
        console.log(this.users);
        return this.users;
    }
}

let userService = new UserService();
export default userService;