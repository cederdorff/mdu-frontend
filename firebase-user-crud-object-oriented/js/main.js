import UserService from "./user-service.js";

let _userService = new UserService();
let _selectedUserId = "";

document.querySelector("#btn-create").onclick = () => {
	// references to the input fields
	let nameInput = document.querySelector("#name");
	let mailInput = document.querySelector("#mail");
	_userService.create(nameInput.value, mailInput.value);
};

window.selectUser = id => {
	const user = _userService.getUser(id);
	_selectedUserId = id;
	// references to the input fields
	document.querySelector("#name-update").value = user.name;
	document.querySelector("#mail-update").value = user.mail;
	//scroll to update form
	document.querySelector("#form-update").scrollIntoView({ behavior: "smooth" });
};

document.querySelector("#btn-update").onclick = () => {
	let nameInput = document.querySelector("#name-update");
	let mailInput = document.querySelector("#mail-update");
	_userService.update(_selectedUserId, nameInput.value, mailInput.value);
};

window.deleteUser = function (id) {
	_userService.delete(id);
};
