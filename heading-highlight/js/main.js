"use strict"; // to enable strict mode and modern JavaScript functionality

// declaring a variable with a value
let message = "Let's try with some JavaScript";

// accessing the variable and logging it to the console
console.log(message);

// appending the value from the variable to thee DOM element #content
document.querySelector("#content").innerHTML = /*html*/`
  <p>
    <span class="highlight">${message}</span>
  </p>`;

// showing and alert with a message
function showAlert() {
  alert('Open your Developer Console!');
}