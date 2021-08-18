import UserService from "./user-service.js";

let _userService = new UserService();
let _selectedUserId = "";

window.createUser = () => {
  // references to the input fields
  let nameInput = document.querySelector('#name');
  let mailInput = document.querySelector('#mail');
  _userService.create(nameInput.value, mailInput.value);
}

window.selectUser = (id, name, mail) => {
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  nameInput.value = name;
  mailInput.value = mail;
  _selectedUserId = id;
}

window.updateUser = () => {
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  _userService.update(_selectedUserId, nameInput.value, mailInput.value);
}

window.deleteUser = function(id) {
  _userService.delete(id);
}