console.log("router.js is running!");

/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const routes = {
    "#/": "home",
    "#/about": "about",
    "#/clients": "clients",
    "#/contact": "contact"
};

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
    let pages = document.querySelectorAll(".page");
    for (let page of pages) {
        page.style.display = "none";
    }
}

/**
 * Navigating SPA to specific page by given pathnameß
 */
function navigateTo(pathname) {
    hideAllPages();
    const basePath = location.pathname.replace("index.html", "");
    window.history.pushState({}, pathname, basePath + pathname);
    document.querySelector(`#${routes[pathname]}`).style.display = "block";
    setActiveTab(pathname);
};

/**
 * sets active tabbar/ menu item
 */
function setActiveTab(pathname) {
    let navLinks = document.querySelectorAll("nav a");
    for (let link of navLinks) {
        if (pathname === link.getAttribute("href")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    }
}

/**
 * Attaching event to nav links and preventing default anchor link event
 */
function attachNavLinkEvents() {
    const navLinks = document.querySelectorAll(".nav-link");
    for (const link of navLinks) {
        link.addEventListener("click", function (event) {
            const path = link.getAttribute("href");
            navigateTo(path);
            event.preventDefault();
        });
    }
}

/**
 * Initialising the router, calling attachNavLinkEvents() and navigateTo()
 */
function initRouter() {
    attachNavLinkEvents();

    let defaultPath = "#/";
    if (routes[location.hash]) {
        defaultPath = location.hash;
    }
    navigateTo(defaultPath);
}

initRouter();