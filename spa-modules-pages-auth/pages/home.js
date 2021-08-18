export default class HomePage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="home" class="page">
        <header class="topbar">
          <h2>Home</h2>
        </header>
        <h3>SPA Template Modules Pages</h3>
        <p>My Single Page Web App Template</p>
      </section>
    `;
  }
}