import userService from "../services/users-service.js";

class CreatePage {

    constructor(domElement) {
        this.domElement = domElement;
    }

    async createUser() {
        const nameInput = this.domElement.querySelector(".name-input");
        const mailInput = this.domElement.querySelector(".mail-input");

        console.log(await userService.create(nameInput.value, mailInput.value));
    }

}

export default CreatePage;