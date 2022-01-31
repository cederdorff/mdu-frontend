/*
Fetches json data from the file persons.json
*/
let familyMembers = [
    {
        name: "Peter Madsen",
        age: 52,
        hairColor: "blonde",
        relation: "dad",
        img: "img/dad.jpg"
    },
    {
        name: "Ane Madsen",
        age: 51,
        hairColor: "brown",
        relation: "mom",
        img: "img/ane.jpg"
    },
    {
        name: "Rasmus Madsen",
        age: 29,
        hairColor: "blonde",
        relation: "brother",
        img: "img/rasmus.jpg"
    },
    {
        name: "Mie Madsen",
        age: 25,
        hairColor: "brown",
        relation: "sister",
        img: "img/mie.jpg"
    },
    {
        name: "Mads Madsen",
        age: 18,
        hairColor: "dark",
        relation: "brother",
        img: "img/mads.jpg"
    },
    {
        name: "Jens Madsen",
        age: 14,
        hairColor: "blonde",
        relation: "brother",
        img: "img/jenspeter.jpg"
    }
];

console.log(familyMembers);

/*
Appends json data to the DOM
*/
function appendPersons(persons) {
    let htmlTemplate = "";
    for (let person of persons) {
        htmlTemplate += /*html*/ `
      <article>
        <img src="${person.img}">
        <h3>${person.name}</h3>
        <p>${person.age} years old</p>
        <p>Hair color: ${person.hairColor}</p>
        <p>Relation: ${person.relation}</p>
      </article>
    `;
    }
    document.querySelector("#persons").innerHTML = htmlTemplate;
}

appendPersons(familyMembers);

function search(searchValue) {
    searchValue = searchValue.toLowerCase();
    console.log(searchValue);

    let result = [];

    for (let familyMember of familyMembers) {
        let name = familyMember.name.toLowerCase();
        if (name.includes(searchValue.toLowerCase())) {
            result.push(familyMember);
        }
    }
    appendPersons(result);
}

function add(event) {
    event.preventDefault();
    const formData = event.target;
    let newPerson = {
        name: formData.name.value,
        age: formData.age.value,
        hairColor: formData.hairColor.value,
        relation: formData.relation.value,
        img: formData.imageUrl.value
    };
    console.log(newPerson);

    familyMembers.push(newPerson);
    appendPersons(familyMembers);
}
