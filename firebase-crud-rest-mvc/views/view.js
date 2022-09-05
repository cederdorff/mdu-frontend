export default class View {
    constructor(controller) {
        this.controller = controller;
        this.selectedUserId;
        this.addEvents();
        this.userDialog = document.querySelector("#dialog-update");
    }

    displayUsers(userList) {
        let html = "";

        for (const user of userList) {
            html += /*html*/ `
             <article>
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <p><a href="mailto:${user.mail}">${user.mail}</a></p>
                    <button class="btn-delete-user" data-id="${user.id}">Delete</button>
                    <button class="btn-update-user" data-id="${user.id}">Update</button>
            </article>   
        `;
        }

        document.querySelector("#users-grid").innerHTML = html;
        this.addUserClickEvents();
    }

    addUserClickEvents() {
        //delete event
        const deleteBtns = document.querySelectorAll(".btn-delete-user");
        for (const btn of deleteBtns) {
            btn.onclick = () => {
                const userId = btn.getAttribute("data-id");
                const shouldDelete = confirm("Are you sure you want to delete this user?");
                if (shouldDelete) {
                    this.controller.handleDeleteUser(userId);
                }
            };
        }

        //update event
        const updateBtns = document.querySelectorAll(".btn-update-user");
        for (const btn of updateBtns) {
            btn.onclick = async () => {
                this.selectedUserId = btn.getAttribute("data-id");
                const user = await this.controller.handleGetUser(this.selectedUserId);
                const form = document.querySelector("#form-update");
                form.name.value = user.name;
                form.mail.value = user.mail;
                form.image.value = user.image;
                this.userDialog.showModal();
            };
        }
    }

    addEvents() {
        //dialog cancel event
        document.querySelector("#btn-cancel").onclick = () => this.userDialog.close();

        // create form submit event
        document.querySelector("#form-create").onsubmit = event => {
            event.preventDefault();
            const name = event.target.name.value;
            const mail = event.target.mail.value;
            const image = event.target.image.value;
            this.controller.handleCreateUser(name, mail, image);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        // update form submit event
        document.querySelector("#form-update").onsubmit = event => {
            const name = event.target.name.value;
            const mail = event.target.mail.value;
            const image = event.target.image.value;
            this.controller.handleUpdateUser(this.selectedUserId, name, mail, image);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }
}
