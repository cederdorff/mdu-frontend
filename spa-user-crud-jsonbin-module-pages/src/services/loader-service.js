class LoaderService {
    constructor() {
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