/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const _routes = {
	"#/": "home",
	"#/about": "about",
	"#/clients": "clients",
	"#/profile": "profile",
	"#/login": "login"
};
const _pages = document.querySelectorAll(".page");
const _basePath = location.pathname.replace("index.html", ""); // remove index.html from path
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
 * Navigating SPA to specific page by given path
 */
export function navigateTo(path) {
	window.history.pushState({}, path, _basePath + path);
	showPage(path);
}

/**
 * Displaying page by given path
 */
function showPage(path) {
	hideAllPages(); // hide all pages
	document.querySelector(`#${_routes[path]}`).style.display = "block"; // show page by given path
	if (path == "#/login" || path == "#/signup") {
		showTabbar(false);
	} else {
		showTabbar(true);
		setActiveTab(path);
	}
}

/**
 * sets active menu item by given path
 */
function setActiveTab(path) {
	for (const link of _navLinks) {
		if (path === link.getAttribute("href")) {
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
	window.onpopstate = () => showPage(location.hash); // change page when using back and forth in browser

	let path = "#/login"; // default path
	if (_routes[location.hash]) {
		path = location.hash;
	}
	navigateTo(path);
}

initRouter();

// show and hide tabbar
function showTabbar(show) {
	let tabbar = document.querySelector(".tabbar");
	if (show) {
		tabbar.classList.remove("hide");
	} else {
		tabbar.classList.add("hide");
	}
}
