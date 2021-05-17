"use strict";

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  }
}

// navigate to a new view/page by changing href
function navigateTo(pageId) {
  location.href = `#${pageId}`;
}

// set default page or given page by the hash url
// function is called 'onhashchange'
function pageChange() {
  let page = "home";
  if (location.hash) {
    let hashes = location.hash.split("#");
    page = hashes[1];
    if (hashes[2]) {
      scrollToElement(hashes[2]);
    }
  }
  showPage(page);
}

function scrollToElement(id) {
  let offsetTop = document.querySelector(`#${id}`);
  setTimeout(() => {
    offsetTop.scrollIntoView({
      behavior: "smooth"
    });
  }, 500);
}

pageChange(); // called by default when the app is loaded for the first time