"use strict";
let users = [];

console.log(document);
console.log(window);
console.log(navigator);

navigator.geolocation.getCurrentPosition(position => {
  console.log(position);
  document.querySelector("#location").innerHTML += `
  <p>Latitude: ${position.coords.latitude}</p>
  <p>Longitude: ${position.coords.longitude}</p>
  `;
});

fetch('http://ip-api.com/json').then(response => {
  return response.json();
}).then(location => {
  console.log(location);
  document.querySelector("#location").innerHTML += `
  <p>City: ${location.city}</p>
  <p>Country: ${location.country}</p>
  `;
});

document.querySelector('#createUserBtn').addEventListener("click", function() {
  createUser();
});

function createUser() {
  // declaring input field variables
  let nameInput = document.querySelector('#name');
  let emailInput = document.querySelector('#email');

  let newUser = {
    name: nameInput.value,
    email: emailInput.value
  };

  users.push(newUser);
  console.log(users);

  // reset input fields
  nameInput.value = "";
  emailInput.value = "";
}
