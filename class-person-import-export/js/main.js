import User from "./user.js";

const users = [
  new User("Birgitte", "bki@mail.dk", "1966-01-14", "https://www.eaaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg"),
  new User("Martin", "mnor@mail.dk", "1989-05-02", "https://media-exp1.licdn.com/dms/image/C4D03AQElLjyVglReqw/profile-displayphoto-shrink_200_200/0/1520939660019?e=1635984000&v=beta&t=7uItfTpjOTVch13Mpv_PY91rPCaxyUxzsaP4-CAVCjU"),
  new User("Rasmus", "race@mail.dk", "1990-09-15", "https://www.eaaa.dk/media/devlvvgj/rasmus-cederdorff.jpg")
];

console.log(users);

for (const user of users) {
  document.querySelector("#content").innerHTML += user.getHtmlTemplate();
}