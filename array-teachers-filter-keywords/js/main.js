"use strict";

let teachers = [{
  name: "Birgitte Kirk Iversen",
  initials: "bki",
  mail: "bki@baaa.dk",
  phone: "72286316",
  address: "Sønderhøj 30, 8260 Viby J",
  position: "Senior Lecturer",
  department: "Multimedia Design",
  img: "https://www.baaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg",
  keywords: ["Communication", "UX"]
}, {
  name: "Maria Louise Bendixen",
  initials: "mlbe",
  mail: "mlbe@baaa.dk",
  phone: "72286345",
  address: "Ringvej Syd 104, 8260 Viby J",
  position: "Senior Lecturer",
  department: "Multimedia Design",
  img: "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg",
  keywords: ["Communication", "UX", "UI"]
}, {
  name: "Kim Elkjær Marcher-Jepsen",
  initials: "kije",
  mail: "kije@baaa.dk",
  phone: "7228 6325",
  address: "Sønderhøj 30, 8260 Viby J",
  position: "Lecturer",
  department: "Multimedia Design",
  img: "https://www.baaa.dk/media/3zihz21l/kim-elkjaer-marcher-jepsen.jpg",
  keywords: ["Frontend"]
},
{
  name: "Rasmus Cederdorff",
  initials: "race",
  mail: "race@baaa.dk",
  phone: "72286318",
  address: "Sønderhøj 30, 8260 Viby J",
  position: "Lecturer",
  department: "Multimediedesigner & Professionsbachelor i digital konceptudvikling",
  img: "https://www.baaa.dk/media/devlvvgj/rasmus-cederdorff.jpg",
  keywords: ["Programming", "Frontend", "UX", "UI"]
}
];

appendTeachers(teachers);

// Appending objects to the DOM
function appendTeachers(teachers) {
  document.querySelector("#grid-teachers").innerHTML = ""; // clear content of grid teachers
  for (let teacher of teachers) {
    console.log(teacher);
    document.querySelector("#grid-teachers").innerHTML +=
      "<article>" +
      "<img src='" + teacher.img + "'>" +
      "<h3>" + teacher.name + "</h3>" +
      teacher.position + "<br>" +
      "<a href='mailto:" + teacher.mail + "'>" + teacher.mail + "</a><br>" +
      "Keywords: " + teacher.keywords +
      "</article>";
  }
}

function filterByKeyword(keyword) {
  let filteredTeachers = [];
  for (let teacher of teachers) {
    if (teacher.keywords.includes(keyword)) {
      filteredTeachers.push(teacher);
    }
  }
  console.log(filteredTeachers);
  appendTeachers(filteredTeachers);
}

function reset() {
  appendTeachers(teachers);
}