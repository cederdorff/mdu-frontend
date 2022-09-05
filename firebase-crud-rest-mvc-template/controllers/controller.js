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

    // handleCreateUser
    // to do

    // handleUpdateUser
    // to do

    // handleDeleteUser
    // to do

    // handleGetUser
    // to do
}
