function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[weekDays];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#day");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  let cityElement =
    document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector(
    "#temperature"
  );
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(
    celsiusTemperature
  );
  let humidityElement =
    document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%;`;
  let windElement =
    document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(".looks").innerHTML =
    response.data.weather[0].main;
  let iconElement =
    document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
}

function search(city) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(
    "#city-input"
  ).value;
  search(city);
}

let searchForm = document.querySelector(
  "#search-form"
);
searchForm.addEventListener(
  "click",
  handleSubmit
);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    showPosition
  );
}

let currentLocationButton =
  document.querySelector(".current");
currentLocationButton.addEventListener(
  "click",
  getCurrentLocation
);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(
    "#temperature"
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature =
    (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(
    "#temperature"
  );
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(
    celsiusTemperature
  );
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(
  "#fahrenheit-link"
);
fahrenheitLink.addEventListener(
  "click",
  showFahrenheitTemperature
);

let celsiusLink = document.querySelector(
  "#celsius-link"
);
celsiusLink.addEventListener(
  "click",
  showCelsiusTemperature
);

search(
  navigator.geolocation.getCurrentPosition(
    showPosition
  )
);
