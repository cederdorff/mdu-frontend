import userService from "../services/users-service.js";
import loaderService from "../services/loader-service.js";

class UsersPage {

	constructor(domElement) {
		this.domElement = domElement;
		this.init();
	}

	async init() {
		this.appendUsers(await userService.get());
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
		loaderService.show(false);
	}

	showEditPage(userId) {
		console.log(userId);
	}

	async showDeleteDialog(userId) {
		const deleteUser = confirm("Do you want to delete user?");
		if (deleteUser) {
			const newUsers = await userService.delete(userId);
			console.log(newUsers);
			this.appendUsers(newUsers);
		}
	}
}

export default UsersPage;