let currentTime = new Date();

function realTime(time) {
  let updateTime = document.querySelector("small#nowTime");
  let currentHour = time.getHours();
  let currentMinute = time.getMinutes();
  if (currentMinute < 10) {
    updateTime.innerHTML = `${currentHour}:0${currentMinute}`;
  } else {
    updateTime.innerHTML = `${currentHour}:${currentMinute}`;
  }
}

function currentDay(day) {
  let newDay = document.querySelector("h2#day");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = days[day.getDay()];
  newDay.innerHTML = `${today}`;
}

currentDay(currentTime);
realTime(currentTime);

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "a45009276b5d2c36a77a4369b0150486";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function fahrenheit(event) {
  event.preventDefault();
  let metricF = document.querySelector("#current-temp");
  let currentTemp = metricF.innerHTML;
  metricF.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
}

function celcius(event) {
  event.preventDefault();
  let metricC = document.querySelector("#current-temp");
  let currentTemp = metricC.innerHTML;
  metricC.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
}

function searchLocation(position) {
  let apiKey = `a45009276b5d2c36a77a4369b0150486`;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function findCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let unitCelcius = document.querySelector("a#celcius-link");
unitCelcius.addEventListener("click", celcius);

let unitFahrenheit = document.querySelector("a#fahrenheit-link");
unitFahrenheit.addEventListener("click", fahrenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentLocation);

searchCity("Amsterdam");
