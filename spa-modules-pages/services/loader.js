class LoaderService {
  constructor() {
    this.template();
  }

  template() {
    document.querySelector('#content').innerHTML += /*html*/ `
      <div id="loader">
        <div class="spinner"></div>
      </div>
    `;
  }

  show(show) {
    let loader = document.getElementById('loader');
    if (show) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  }

}

const loaderService = new LoaderService();
export default loaderService;