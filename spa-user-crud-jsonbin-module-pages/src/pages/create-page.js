import userService from "../services/users-service.js";

class CreatePage {

    constructor(domElement) {
        this.domElement = domElement;
        this.render();
        this.attachEvents();
    }

    render() {
        this.domElement.innerHTML +=/*html*/`
			<section id="create" class="page">
                <header class="topbar">
                    <a class="left nav-link" href="#/users">Back</a>
                    <h2>Create user</h2>
                    <a class="right" onclick="createUser()">Save</a>
                </header>
                <form>
                    <input type="text" class="name-input" placeholder="Type your name" required>
                    <input type="email" class="mail-input" placeholder="Type your mail" required>
                    <button type="button" name="button" onclick="createUser()">Create User</button>
                </form>
            </section>
		`;
    }

    attachEvents() {
        window.createUser = () => this.createUser();
    }

    async createUser() {
        const nameInput = this.domElement.querySelector(".name-input");
        const mailInput = this.domElement.querySelector(".mail-input");

        const users = await userService.create(nameInput.value, mailInput.value);


    }

}

export default CreatePage;