function updateWeather(response) {
  let currentTemperature = document.querySelector("#temp");
  let temp = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = response.data.condition.description;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${response.data.temperature.humidity} %`;
  let currentSpeedWind = document.querySelector("#wind-speed");
  currentSpeedWind.innerHTML = `${response.data.wind.speed} km/h`;
  let currentTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  console.log(response.data);
  currentTime.innerHTML = formatDate(date);
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
                  src="${response.data.condition.icon_url}"              
                  class="temp-icon"/>
                `;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
  let apiKey = "btf3a0c41c82o04bde5657e178c809b4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  searchCity(searchInput.value);
}

function displayForecast() {

  let days = ["Thu", "Wed", "Sut", "Sun", "Mon"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml = forecastHtml + `
      <div class="weather-daily">
            <div class="forecast-day">${day}</div>
            <div class="forecast-icon">⛅</div>
            <div class="forecast-temp"><strong>15&deg</strong> 9&deg</div>
          </div>`;
  });

  let forecast = document.querySelector(".weather-forecast");
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#main-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Kyiv");
displayForecast();