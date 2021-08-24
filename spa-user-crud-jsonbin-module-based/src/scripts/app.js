import "./router.js";
import userService from "./users-service.js";
import loaderService from "./loader-service.js";


async function appendUsers() {
  let users = await userService.get();
  let htmlTemplate = "";
  for (let user of users) {
    htmlTemplate += /*html*/ `
      <article>
        <h3>${user.name}</h3>
        <p><a href="mailto:${user.mail}">${user.mail}</a></p>
        <button onclick="selectUser('${user.id}')">Update</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </article>
      `;
  }
  document.querySelector("#users-grid").innerHTML = htmlTemplate;
  loaderService.show(false);
}


appendUsers();

window.selectUser = (id) => console.log(id);
window.deleteUser = (id) => console.log(id);