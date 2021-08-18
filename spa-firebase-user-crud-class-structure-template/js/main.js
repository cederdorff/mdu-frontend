import SpaService from "./spa-service.js";
import UserService from "./user-service.js";

let _spaService = new SpaService("home");
let _userService = new UserService();
let _selectedUserId = "";
let _selectedImgFile = "";

window.pageChange = function() {
  _spaService.pageChange();
}

window.createUser = () => {}

window.selectUser = (id, name, mail, img) => {
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  let imageInput = document.querySelector('#imagePreviewUpdate');
  nameInput.value = name;
  mailInput.value = mail;
  imageInput.src = img;
  _selectedUserId = id;
  _spaService.navigateTo("edit");
}

window.updateUser = () => {}

window.deleteUser = (id) => {

}

window.previewImage = (file, previewId) => {
  if (file) {
    _selectedImgFile = file;
    let reader = new FileReader();
    reader.onload = event => {
      document.querySelector('#' + previewId).setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
  }
}