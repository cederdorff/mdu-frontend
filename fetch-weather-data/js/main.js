document.addEventListener("DOMContentLoaded", () => {
  // the DOM is fully loaded
  console.log("Document ready!");
  loadWeatherData();
});

function loadWeatherData() {
  const url = 'http://api.weatherstack.com/current';
  const key = 'f104663606762aadb9858a8367d0d156';
  let query = 'Aarhus';

  fetch(`${url}?access_key=${key}&query=${query}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      let current = json.current;
      document.querySelector('#current-condition').innerHTML = `
        <h2>${current.weather_descriptions}</h2>
        <img src='${current.weather_icons}'>
        <p>${current.temperature} &#8451</p>
        <p>Feels like: ${current.feelslike} &#8451</p>
      `;
    });
}