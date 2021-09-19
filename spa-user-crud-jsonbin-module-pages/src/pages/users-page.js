import userService from "../services/users-service.js";
import loader from "../component/loader-component.js";
class UsersPage {

	constructor(domElement) {
		this.domElement = domElement;
		this.render();
		this.attachEvents();
		this.init();
	}

	async init() {
		// get users from users service
		const users = await userService.get()
		this.appendUsers(users);
		loader.show(false);
	}

	render() {
		this.domElement.innerHTML +=/*html*/`
			<section id="users" class="page">
        		<header class="topbar">
            		<h2>Users</h2>
            		<a class="right nav-link" href="#/create">Create</a>
       			</header>
        		<section class="users-grid grid-container"></section>
    		</section>
		`;
	}

	appendUsers(users) {
		let htmlTemplate = "";
		for (let user of users) {
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
	}

	attachEvents() {
		window.selectUser = (id) => this.showEditPage(id);
		window.deleteUser = (id) => this.showDeleteDialog(id);
	}

	showEditPage(userId) {
		console.log(userId);
		location.href = "#/update";
	}

	async showDeleteDialog(userId) {
		const deleteUser = confirm("Do you want to delete user?");
		if (deleteUser) {
			loader.show(true);
			const newUsers = await userService.delete(userId);
			this.appendUsers(newUsers);
			loader.show(false);
		}
	}
}

export default UsersPage;