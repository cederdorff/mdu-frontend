export default class ClientsPage {
  constructor() {
    this.template();
  }

  template() {
    document.querySelector('#app').innerHTML += /*html*/ `
      <section id="clients" class="page">
        <header class="topbar">
          <h2>Clients</h2>
        </header>
        <h3>Display your clients</h3>
        <p>You might want to call it something different.</p>
      </section>
    `;
  }
}