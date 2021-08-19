"use strict";

// declaring teacher objects

// Birgitte
let teacher1 = {
  name: "Birgitte Kirk Iversen",
  initials: "bki",
  mail: "bki@baaa.dk",
  phone: "7228 6316",
  address: "Ringvej Syd 104, 8260 Viby J",
  position: "Senior Lecturer",
  department: "Multimedia Design",
  img: "https://www.baaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg"
};

// Martin
let teacher2 = {

};

// log objects to the developer console
console.log(teacher1);

// Appending objects to the DOM

// teacher1 - Birgitte
document.querySelector("#grid-teachers").innerHTML += /*html*/ `
<article>
  <img src='${teacher1.img}'>
  <h3>${teacher1.name}</h3>
  ${teacher1.position}<br>
  <a href='mailto:${teacher1.mail}'>${teacher1.mail}</a>
</article>`;

//teacher2 - Martin
//todo