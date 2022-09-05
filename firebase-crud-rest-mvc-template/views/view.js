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
        // to do
        //update event
        // to do
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
            console.log(name, mail, image);
            // todo: call controller and handle create
        };

        // update form submit event
        document.querySelector("#form-update").onsubmit = event => {
            const name = event.target.name.value;
            const mail = event.target.mail.value;
            const image = event.target.image.value;
            console.log(name, mail, image);
            // todo: call controller and handle update
        };
    }
}
