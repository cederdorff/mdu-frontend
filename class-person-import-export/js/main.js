import Person from "./user.js";

const persons = [
  new Person("Birgitte", "bki@mail.dk", "1966-01-14", "https://www.eaaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg"),
  new Person("Martin", "mnor@mail.dk", "1989-05-02", "https://media-exp1.licdn.com/dms/image/C4D03AQElLjyVglReqw/profile-displayphoto-shrink_200_200/0/1520939660019?e=1635984000&v=beta&t=7uItfTpjOTVch13Mpv_PY91rPCaxyUxzsaP4-CAVCjU"),
  new Person("Rasmus", "race@mail.dk", "1990-09-15", "https://www.eaaa.dk/media/devlvvgj/rasmus-cederdorff.jpg")
];

console.log(persons);

for (const person of persons) {
  document.querySelector("#content").innerHTML += person.getHtmlTemplate();
}