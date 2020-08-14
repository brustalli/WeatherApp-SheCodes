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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours;
  if (hours < 10) {
    minutes = `0${hours}`;
  }
  let minutes = date.getMinutes;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = `9c9113d065806620d583cdfa492f9ff6`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.list[0];
  console.log(forecast);
  document.querySelector(`#forecast`).innerHTML = `<div class="col-5">
    <p class="hours">
      ${formatHours(forecast.dt * 1000)}
          </p>
  </div>
    <div class="col-2">
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
        class="iconSixDays"
        id="icon"
      />
    </div>
    <div class="col-5">
      <p class="tempDays"><strong>${Math.round(
        forecast.main.temp_max
      )}° </strong> ${Math.round(forecast.main.temp_min)}°</p>
    </div>`;
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
  celsiusTemperature = response.data.main.temp;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    celsiusTemperature
  );

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

searchCity(`Rio de Janeiro`);
