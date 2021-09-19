class LoaderComponent {
    constructor() {
        this.render();
        this.loader = document.querySelector(".loader");
    }

    render() {
        document.body.innerHTML += /*html*/`
            <section class="loader">
                <div class="spinner"></div>
            </section>
        `;
    }

    show(show) {
        if (show) {
            this.loader.classList.remove("hide");
        } else {
            this.loader.classList.add("hide");
        }
    }

}

const loader = new LoaderComponent();
export default loader;