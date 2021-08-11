"use strict"; // to enable strict mode and modern JavaScript functionality

async function fetchJson() {
  const url = "https://api.jsonbin.io/b/61138ef2d5667e403a3fb6a1";

  const response = await fetch(url, {
    headers: {
      "X-Master-Key": "$2b$10$Uf1lbMtIPrrWeneN3Wz6JuDcyBuOz.1LbHiUg32QexCCJz3nOpoS2",
      "Content-Type": "application/json",
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
        <h3>${teacher.name}</h3>
        <a href='mailto:${teacher.mail}'>${teacher.mail}</a>
    </article>
        `;
  }
  document.querySelector("#teachers-grid").innerHTML = html;
}

fetchJson();