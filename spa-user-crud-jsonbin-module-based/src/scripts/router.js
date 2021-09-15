class Router {

    constructor(app, defaultPage) {
        this.defaultPage = defaultPage;
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
    navigateTo(pathname) {
        this.hideAllPages();
        const basePath = location.pathname.replace("index.html", "");
        window.history.pushState({}, pathname, basePath + pathname);
        document.querySelector(`#${this.routes[pathname]}`).style.display = "block";
        this.setActiveTab(pathname);
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
