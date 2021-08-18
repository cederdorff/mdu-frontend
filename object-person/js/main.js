"use strict"; // to enable strict mode and modern JavaScript functionality

function showAlert() {
  alert('Open your Developer Console!');
}

// declare yourself as an object
let person = {
  name: "Rasmus Cederdorff",
  initials: "race",
  age: 30,
  city: "Aarhus C",
  education: "Master of Science in IT",
  whyMDU: "The combination of design and programming",
  expectations: "Prepare you for the real world.",
  specialisation: "I speak JavaScript",
  dreamJob: "Frontend Developer at Apple Inc (or Senior Lecturer)",
  funFacts: "My socks often match color combinations in my clothes.",
  image: "https://avatars3.githubusercontent.com/u/6738394",
  web: "https://cederdorff.com",
  instagram: "https://instagram.com/cederdorff/",
  linkedIn: "https://www.linkedin.com/in/cederdorff/"
};

console.log(person);

// append the object to the DOM
document.querySelector("#content").innerHTML +=/*html*/ `
    <article>
      <img src='${person.image}'>
      <h3>${person.name}</h3>
      <a href='${person.web}'>${person.web}</a>
    </article>
`;