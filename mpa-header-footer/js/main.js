async function loadHeader() {
    const response = await fetch("components/header.html");
    const header = await response.text();
    document.querySelector("body").insertAdjacentHTML("afterbegin", header);
}

async function loadFooter() {
    const response = await fetch("components/footer.html");
    const footer = await response.text();
    document.querySelector("body").insertAdjacentHTML("beforeend", footer);
}

loadHeader();
loadFooter();
