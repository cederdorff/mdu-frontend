class User {
  constructor(name, mail, birthDate) {
    this.name = name;
    this.mail = mail;
    this.birthDate = birthDate; // format: yyyy-mm-dd
    this.imgUrl;
  }

  logPerson() {
    console.log(`
      Name: ${this.name}
      Mail: ${this.mail}
    `);
  }

  getAge() {
    const birthDate = new Date(this.birthDate);
    const today = new Date;

    const diff = new Date(today - birthDate.getTime());

    return diff.getUTCFullYear() - 1970;
  }

  setProfileImage(url) {
    this.imgUrl = url;
  }

  getProfileImage() {
    if (this.imgUrl) {
      return this.imgUrl;
    } else {
      return "./img/user-placeholder.jpg";
    }
  }

  sayHi() {
    alert("Hey " + this.name);
  }

  getHtmlTemplate() {
    return /*html*/`
    <article>
      <img src="${this.getProfileImage()}">
      <h2>${this.name}</h2> 
      <p>Age: ${this.getAge()}</p>
      <p><a href="mailto:${this.mail}">${this.mail}</a></p>
    </article>
    `;
  }
}


const user = new User("Rasmus Cederdorff", "race@eaaa.dk", "1990-03-12");
user.setProfileImage("https://www.eaaa.dk/media/devlvvgj/rasmus-cederdorff.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132301335324630000&format=webp");
document.querySelector("#content").innerHTML += user.getHtmlTemplate();

const user2 = new User("Martin Aagaard Nøhr", "mnor@eaaa.dk", "1989-08-10");
document.querySelector("#content").innerHTML += user2.getHtmlTemplate();