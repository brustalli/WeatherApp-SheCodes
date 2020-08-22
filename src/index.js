function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedsnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function showTemperature(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  dayTemperature = response.data.main.temp;
  document.querySelector(`#temperature`).innerHTML = Math.round(dayTemperature);
  celsiusTemperature = response.data.main.temp;
  document.querySelector(`#daily-description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#actual-day`).innerHTML = formatDate(
    response.data.dt * 1000
  );

  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );

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

function displayForecast(response) {
  let forecastElement = document.querySelector(`#forecast`);
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <ul>
    <li class="hours">
      ${formatHours(forecast.dt * 1000)}
          </li>
          <li class="box-icon">
      <img  class="iconHours"
          src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"/>
  </li>
  <li class="hourTemp">
      <spam class="tempHoursMax">${Math.round(forecast.main.temp_max)}°  </spam>
      <spam class="tempHoursMin">
      ${Math.round(forecast.main.temp_min)}°</spam>
      </li>
      </ul>`;
  }
}

function searchCity(city) {
  let apiKey = `9c9113d065806620d583cdfa492f9ff6`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector(`#temperature`).innerHTML = Math.round(fahrenheitTemp);
  celsius.classList.remove(`active`);
  fahrenheit.classList.add(`active`);
}
document
  .querySelector(`#fahrenheit`)
  .addEventListener(`click`, showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector(`#temperature`).innerHTML = Math.round(
    celsiusTemperature
  );
  celsius.classList.add(`active`);
  fahrenheit.classList.remove(`active`);
}
document.querySelector(`#celsius`).addEventListener(`click`, showCelsiusTemp);
let celsiusTemperature = null;

searchCity(`Rio de Janeiro`);
