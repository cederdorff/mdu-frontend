export default class FavoritesPage {
  constructor() {
    this.template();
  }

  template() {
    document.getElementById('content').innerHTML += /*html*/ `
      <section id="favorites" class="page">
        <header class="topbar">
        <a class="left" href="#movies">Back</a>
          <h2>Favorite Movies</h2>
        </header>
        <section id="fav-movie-container" class="grid-container"></section>
      </section>
    `;
  }
}