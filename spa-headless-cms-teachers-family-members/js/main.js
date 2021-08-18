"use strict";

// Global Variables
let _familyMembers = [];
let _teachers = [];

// ---------- Fetch data from data sources ---------- //
/*
Fetches post data from my headless cms
*/
async function getPersons() {
  showLoader();
  let response = await fetch('https://headlesscms.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=3');
  let data = await response.json();
  _familyMembers = data;
  appendPersons(_familyMembers);
  showLoader(false);
}
/*
Appends json data to the DOM
*/
function appendPersons(persons) {
  let htmlTemplate = "";
  for (const person of persons) {
    htmlTemplate += /*html*/`
      <article>
        <img src="${getFeaturedImageUrl(person)}">
        <h3>${person.title.rendered}</h3>
        <p>${person.acf.age} years old</p>
        <p>Hair color: ${person.acf.hairColor}</p>
        <p>Relation: ${person.acf.relation}</p>
      </article>
      `;
  }
  document.querySelector("#persons").innerHTML = htmlTemplate;
}

/*
Fetches post data from my headless cms
*/
async function getTeachers() {
  showLoader();
  let data = await fetch('https://headlesscms.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=2').then(response => response.json());
  _teachers = data;
  appendTeachers(_teachers);
  showLoader(false);
}

// appends teachers
function appendTeachers(teachers) {
  let htmlTemplate = "";
  for (const teacher of teachers) {
    htmlTemplate += /*html*/`
    <article>
      <img src="${getFeaturedImageUrl(teacher)}">
      <h3>${teacher.title.rendered}</h3>
      ${teacher.content.rendered}
      <p><a href="mailto:${teacher.acf.email}">${teacher.acf.email}</a></p>
      <p><a href="tel:${teacher.acf.phone}">${teacher.acf.phone}</a></p>
    </article>
    `;
  }
  document.querySelector("#teachers-container").innerHTML = htmlTemplate;
}

function search(value) {
  let searchValue = value.toLowerCase();
  let filteredTeachers = _teachers.filter(teacher => teacher.title.rendered.toLowerCase().includes(searchValue));
  appendTeachers(filteredTeachers);
}

// returns the source url of the featured image of given post or page
function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}

// =========== Loader functionality =========== //

function showLoader(show = true) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

// =========== Init your app =========== //

getPersons();
getTeachers();