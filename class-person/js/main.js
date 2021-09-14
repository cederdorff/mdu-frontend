class Person {
  constructor(name, mail, birthDate, img) {
    this.name = name;
    this.mail = mail;
    this.birthDate = birthDate;
    this.img = img;
  }

  log() {
    console.log(`
      Name: ${this.name}, 
      Mail: ${this.mail}, 
      Birth date: ${this.birthDate}, 
      Image Url: ${this.img}
    `);
  }

  getAge() {
    const birthDate = new Date(this.birthDate);
    const today = new Date();
    const diff = new Date(today - birthDate);
    return diff.getFullYear() - 1970;
  }

  getHtmlTemplate() {
    const template = /*html*/`
      <article>
        <img src="${this.img}">
        <h2>${this.name}</h2>
        <a href="mailto:${this.mail}">${this.mail}</a>
        <p>Birth date: ${this.birthDate}</p>
        <p>Age: ${this.getAge()} years old</p>
      </article>
    `;

    return template;
  }
}

const persons = [
  new Person("Birgitte", "bki@mail.dk", "1966-01-14", "https://www.eaaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg"),
  new Person("Martin", "mnor@mail.dk", "1989-05-02", "https://media-exp1.licdn.com/dms/image/C4D03AQElLjyVglReqw/profile-displayphoto-shrink_200_200/0/1520939660019?e=1635984000&v=beta&t=7uItfTpjOTVch13Mpv_PY91rPCaxyUxzsaP4-CAVCjU"),
  new Person("Rasmus", "race@mail.dk", "1990-09-15", "https://www.eaaa.dk/media/devlvvgj/rasmus-cederdorff.jpg")
];

console.log(persons);

for (const person of persons) {
  document.querySelector("#content").innerHTML += person.getHtmlTemplate();
}