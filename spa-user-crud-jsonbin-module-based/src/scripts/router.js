class Router {

    constructor(app, defaultPage) {
        this.defaultPage = defaultPage;
        this.basePath = location.pathname.replace("index.html", ""); // remove index.html from path
        this.pages = app.querySelectorAll(".page");
        this.navItems = app.querySelectorAll(".nav-link");
        this.routes = {
            "#/users": "users",
            "#/create": "create",
            "#/update": "update"
        };
        this.initRouter();
    }

    initRouter() {
        this.attachNavLinkEvents();
        window.addEventListener("popstate", () => showPage(location.hash));

        if (this.routes[location.hash]) {
            this.defaultPage = location.hash;
        }
        this.navigateTo(this.defaultPage);
    }

    attachNavLinkEvents() {
        for (const link of this.navItems) {
            link.addEventListener("click", event => {
                const path = link.getAttribute("href");
                this.navigateTo(path);
                event.preventDefault();
            });
        }
    }

    // navigate to a new view/page by changing href
    navigateTo(path) {
        window.history.pushState({}, path, this.basePath + path);
        this.showPage(path);
    }
    showPage(path) {
        this.hideAllPages(); // hide all pages
        document.querySelector(`#${this.routes[path]}`).style.display = "block"; // show page by given path
        this.setActiveTab(path);
    }

    // hide all pages
    hideAllPages() {
        for (const page of this.pages) {
            page.style.display = "none";
        }
    }

    // sets active tabbar/ menu item
    setActiveTab(pathname) {
        for (const link of this.navItems) {
            if (pathname === link.getAttribute("href")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    }

}

export default Router;
