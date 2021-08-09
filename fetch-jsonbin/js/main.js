"use strict"; // to enable strict mode and modern JavaScript functionality

async function fetchJson() {
  const url = `https://api.jsonbin.io/v3/b/610d6c0dd5667e403a3a872a`;

  const response = await fetch(url, {
    headers: {
      'X-Master-Key': '$2b$10$Yf3KXmL/m5RKFETVGwuUGu6P1Y6uoxR/70P6GBjJ.gJQFnkgZ770.',
      'X-BIN-META': false
    }
  }); // fetch and wait the response
  let data = await response.json(); // read response body and wait for parsing the JSON
  appendTeachers(data)
}

// Appending objects to the DOM
function appendTeachers(teachers) {
  let html = "";
  for (let teacher of teachers) {
    console.log(teacher);
    html += /*html*/`
      <article>
      <img src='${teacher.img}'>
        <h3>${teacher.name}</h3>
        ${teacher.position}<br>
        <a href='mailto:${teacher.mail}'>${teacher.mail}</a>
        <p>Keywords: ${teacher.keywords}</p>
    </article>
        `;
  }
  document.querySelector("#teachers-grid").innerHTML = html;
}

fetchJson();