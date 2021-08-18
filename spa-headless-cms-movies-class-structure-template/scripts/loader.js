export default class Loader {
  constructor() {
    this.loader = document.getElementById('loader');
  }

  show(show) {
    if (show) {
      this.loader.classList.remove("hide");
    } else {
      this.loader.classList.add("hide");
    }
  }
}