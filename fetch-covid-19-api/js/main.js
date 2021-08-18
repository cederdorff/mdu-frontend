"use strict"; // to enable strict mode and modern JavaScript functionality

async function fetchCovidData() {
  fetch("https://api.covid19api.com/summary")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    });
}

fetchCovidData();

function appendData(data) {
  console.log(data);
}