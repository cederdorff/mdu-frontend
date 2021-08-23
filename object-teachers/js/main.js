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
  img: "https://www.baaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132301335231430000&format=webp"
};

// Lykke
let teacher2 = {
  name: "Lykke Dahlén",
  initials: "lyda",
  mail: "lyda@baaa.dk",
  phone: "7228 6329",
  address: "Ringvej Syd 104, 8260 Viby J",
  position: "Lecturer",
  department: "Multimedia Design & Digital Concept Development",
  img: "https://www.baaa.dk/media/vk5evkad/lykke-dahlen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132301335291100000&format=webp"
};

// log objects to the developer console
console.log(teacher1);
console.log(teacher2);

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
document.querySelector("#grid-teachers").innerHTML += /*html*/ `
<article>
  <img src='${teacher2.img}'>
  <h3>${teacher2.name}</h3>
  ${teacher2.position}<br>
  <a href='mailto:${teacher2.mail}'>${teacher2.mail}</a>
</article>`;