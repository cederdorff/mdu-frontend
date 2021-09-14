class Teacher {
  constructor(name, initials) {
    this.name = name;
    this.initials = initials;
  }

  getMail() {
    return this.initials + "@eaaa.dk";
  }

  logPerson() {
    console.log(`
      Name: ${this.name}
      Initials: ${this.initials}
      Mail: ${this.getMail()}
    `);
  }

  sayHi() {
    alert(`Hey ${this.name}`);
  }

  append(containerId) {
    document.getElementById(containerId).innerHTML += /*html*/`
    <article>
      <h2>${this.name}</h2> 
      <p><a href="mailto:${this.getMail()}">${this.getMail()}</a></p>
    </article>
    `;
  }
}

let teacher = new Teacher("Rasmus Cederdorff", "race");
console.log(teacher);
console.log(teacher.getMail());
teacher.logPerson();
teacher.append("content");

let teacher2 = new Teacher("Birgitte Kirk Iversen", "bki");
console.log(teacher2);
console.log(teacher2.getMail());
teacher2.logPerson();
teacher2.append("content");
