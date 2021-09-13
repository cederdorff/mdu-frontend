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

    const diff = new Date(today - birthDate.getTime());

    return diff.getUTCFullYear() - 1970;
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

const person1 = new Person("Birgitte Kirk Iversen", "bki@eaaa.dk", "1966-01-14", "https://www.eaaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg");
document.querySelector("#content").innerHTML += person1.getHtmlTemplate();

const person2 = new Person("Rasmus Cederdorff", "race@eaaa.dk", "1990-09-14", "https://www.eaaa.dk/media/devlvvgj/rasmus-cederdorff.jpg");
document.querySelector("#content").innerHTML += person2.getHtmlTemplate();