import authService from "../services/auth.js";
export default class LoginPage {
  constructor() {
    this.template();
    this.authService = authService;
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="profile" class="page">
      <header class="topbar">
        <h2>Profile</h2>
        <a class="right" href="#" onclick="logout()">Logout</a>
      </header>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Type your name" required>
        <label for="mail">Mail</label>
        <input type="email" id="mail" placeholder="Type your mail" disabled>
        <label for="mail">Phone</label>
        <input type="phone" id="phone" placeholder="Type your phone number">
        <label for="birthdate">Birthdate</label>
        <input type="text" id="birthdate" placeholder="Type your birthdate" required>
        <label for="hairColor">Hair Color</label>
        <input type="text" id="hairColor" placeholder="Type your hair color" required>
        <label for="hairColor">Profile Image</label>
        <input type="file" id="img" accept="image/*" onchange="previewImage(this.files[0], 'imagePreview')">
        <img id="imagePreview" class="image-preview">
        <button type="button" name="button" onclick="updateUser()">Save</button>
      </form>
    </section>
    `;
  }

  updateUser() {
    let name = document.querySelector('#name').value;
    let img = document.querySelector('#imagePreview').src;
    let birthdate = document.querySelector('#birthdate').value;
    let hairColor = document.querySelector('#hairColor').value;
    let phone = document.querySelector('#phone').value;

    this.authService.updateAuthUser(name, img, birthdate, hairColor, phone);
  }

  previewImage(file, previewId) {
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        document.querySelector('#' + previewId).setAttribute('src', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  logout() {
    this.authService.logout();
  }
}