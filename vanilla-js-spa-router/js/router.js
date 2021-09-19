/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const _routes = {
    "/": "home",
    "/about": "about",
    "/clients": "clients",
    "/contact": "contact"
};
const _pages = document.querySelectorAll(".page");
const _navLinks = document.querySelectorAll("nav a");

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
    for (const page of _pages) {
        page.style.display = "none";
    }
}

/**
 * Navigating SPA to specific page by given pathnameß
 */
function navigateTo(path) {
    window.history.pushState({}, path, location.origin + path);
    showPage(path)
}

/**
 * Displaying page by given path
 */
function showPage(path) {
    hideAllPages(); // hide all pages
    document.querySelector(`#${_routes[path]}`).style.display = "block"; // show page by given path
    setActiveTab(path);
}

/**
 * sets active tabbar/ menu item
 */
function setActiveTab(pathname) {
    for (const link of _navLinks) {
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
 * Initialising the router, calling attachNavLinkEvents(), popstate event and navigateTo()
 */
function initRouter() {
    attachNavLinkEvents();
    window.addEventListener("popstate", () => showPage(location.pathname)); // change page when using back and forth in browser

    let path = "/"; // default path
    if (_routes[location.pathname]) {
        path = location.pathname;
    }
    navigateTo(path);
}

initRouter();