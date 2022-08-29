export default class Controller {
    initialize(model, view) {
        this.model = model;
        this.view = view;
        // Display initial users
        this.onUsersListChanged();
    }

    async onUsersListChanged() {
        const users = await this.model.getUsers();
        this.view.displayUsers(users);
    }

    async handleCreateUser(name, mail, image) {
        await this.model.createUser(name, mail, image);
        this.onUsersListChanged();
    }

    async handleUpdateUser(id, name, mail, image) {
        await this.model.updateUser(id, name, mail, image);
        this.onUsersListChanged();
    }

    async handleDeleteUser(id) {
        await this.model.deleteUser(id);
        this.onUsersListChanged();
    }

    async handleGetUser(id) {
        return await this.model.getUser(id);
    }
}
