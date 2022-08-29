export default class View {
    constructor(controller) {
        this.controller = controller;
        this.createSubmitEvent();
        this.updateSubmitEvent();
        this.selectedUserId;
    }

    displayUsers(userList) {
        let html = "";

        for (const user of userList) {
            html += /*html*/ `
             <article>
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.mail}">${user.mail}</a>
                <div>
                    <button class="btn-update-user" data-id="${user.id}">Update</button>
                    <button class="btn-delete-user" data-id="${user.id}">Delete</button>
                </div>
            </article>   
        `;
        }

        document.querySelector("#users-grid").innerHTML = html;
        this.addClickEvents();
    }

    addClickEvents() {
        //delete event
        document.querySelectorAll(".btn-delete-user").forEach(
            btn =>
                (btn.onclick = () => {
                    const userId = btn.getAttribute("data-id");
                    const shouldDelete = confirm("Are you sure you want to delete this user?");
                    if (shouldDelete) {
                        this.controller.handleDeleteUser(userId);
                    }
                })
        );

        //update event
        document.querySelectorAll(".btn-update-user").forEach(
            btn =>
                (btn.onclick = async () => {
                    this.selectedUserId = btn.getAttribute("data-id");
                    const user = await this.controller.handleGetUser(this.selectedUserId);
                    const form = document.querySelector("#form-update");
                    form.name.value = user.name;
                    form.mail.value = user.mail;
                    form.image.value = user.image;
                    form.scrollIntoView({ behavior: "smooth" });
                })
        );
    }

    createSubmitEvent() {
        document.querySelector("#form-create").onsubmit = event => {
            event.preventDefault();
            const name = event.target.name.value;
            const mail = event.target.mail.value;
            const image = event.target.image.value;
            this.controller.handleCreateUser(name, mail, image);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }

    updateSubmitEvent() {
        document.querySelector("#form-update").onsubmit = event => {
            event.preventDefault();
            const name = event.target.name.value;
            const mail = event.target.mail.value;
            const image = event.target.image.value;
            this.controller.handleUpdateUser(this.selectedUserId, name, mail, image);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }
}
