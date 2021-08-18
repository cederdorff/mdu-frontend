export default class ContactPage {
  constructor() {
    this.template();
  }

  template() {
    document.querySelector('#app').innerHTML += /*html*/ `
      <section id="contact" class="page">
        <header class="topbar">
          <h2>Contact</h2>
        </header>
        <h3>Contact info</h3>
        <p><a href="mailto:race@eaaa.dk">race@eaaa.dk</a></p>
        <a href="http://cederdorff.com" target="_blank">
          <img src="images/logo.png" alt="Cederdorff logo" class="logo">
        </a>
      </section>
    `;
  }
}