class Loader {

  constructor() {
    this.loader = document.querySelector('#loader');
  }

  show(show) {
    if (show) {
      this.loader.classList.remove("hide");
    } else {
      this.loader.classList.add("hide");
    }
  }

}

export default Loader;