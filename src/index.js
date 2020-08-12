function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedsnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day}`;
}

let weekDay = document.querySelector("#actual-day");
let currentTime = new Date();
weekDay.innerHTML = formatDate(currentTime);

function searchCity(city) {
  let apiKey = `9c9113d065806620d583cdfa492f9ff6`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    celsiusTemperature
  );
  celsiusTemperature = response.data.main.temp;

  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#daily-description`).innerHTML =
    response.data.weather[0].description;

  document
    .querySelector(`#icon`)
    .setAttribute(
      `src`,
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector(`#icon`)
    .setAttribute(`alt`, response.data.weather[0].description);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationBtn = document.querySelector(`#location-button`);
currentLocationBtn.addEventListener(`click`, getCurrentLocation);

function searchLocation(position) {
  let apiKey = `9c9113d065806620d583cdfa492f9ff6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let celsiusTemperature = null;

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector(`#temperature`).innerHTML = Math.round(fahrenheitTemp);
}
document
  .querySelector(`#fahrenheit`)
  .addEventListener(`click`, showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector(`#temperature`).innerHTML = celsiusTemperature;
}

document.querySelector(`#celsius`).addEventListener(`click`, showCelsiusTemp);

searchCity(`Rio de Janeiro`);
