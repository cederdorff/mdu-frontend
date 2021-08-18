// =========== Product functionality =========== //
/*
global variable: _familyMembers
*/
let _familyMembers = [];

/*
Fetches json data from the file persons.json
*/

async function fetchPersons() {
  let response = await fetch('json/persons.json');
  let data = await response.json();
  _familyMembers = data; // storing my json data in a global variable for later use. 
  console.log(_familyMembers);
  appendPersons(_familyMembers);
}

fetchPersons();

/*
Appends json data to the DOM
*/
function appendPersons(persons) {
  let htmlTemplate = "";
  for (let person of persons) {
    htmlTemplate += /*html*/ `
      <article>
        <img src="${person.img}">
        <h4>${person.name}</h4>
        <p>${person.age} years old</p>
        <p>Hair color: ${person.hairColor}</p>
        <p>Relation: ${person.relation}</p>
      </article>
    `;
  }
  document.querySelector("#persons").innerHTML = htmlTemplate;
}

/**
 * Filtering family members by given searchValue
 */
function search(searchValue) {
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);

  let filteredFamilyMembers = [];

  for (let familyMember of _familyMembers) {
    let name = familyMember.name.toLowerCase();
    if (name.includes(searchValue.toLowerCase())) {
      filteredFamilyMembers.push(familyMember);
    }
  }
  appendPersons(filteredFamilyMembers);
}

/**
 * Adding a new family member to the _familyMember array
 */
function add() {
  let inputName = document.getElementById('inputName');
  let inputAge = document.getElementById('inputAge');
  let inputHairColor = document.getElementById('inputHairColor');
  let inputRelation = document.getElementById('inputRelation');
  let inputImageUrl = document.getElementById('inputImageUrl');

  let newPerson = {
    name: inputName.value,
    age: inputAge.value,
    hairColor: inputHairColor.value,
    relation: inputRelation.value,
    img: inputImageUrl.value
  };
  console.log(newPerson);

  _familyMembers.push(newPerson);
  appendPersons(_familyMembers);
}