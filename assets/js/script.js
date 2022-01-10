var cityInputEl = document.querySelector("#city");
var btnEl = document.querySelector("#search-form");
var weatherContainerEl = document.querySelector("#weather-container");
var subtitleEl = document.querySelector(".subtitle");
var weatherIconEl = document.querySelector("#weather-icon");


var locationQuery

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value

    if (city) {
        getCity(city);
        console.log(city);
    } else {
        alert("Please enter a city");
    };
};


var getCity = function (city) {

    //Based on user input, the first search result is returned from the following API
    var apiUrl = "https://nominatim.openstreetmap.org/search?city=" + city + "&format=geocodejson";

    fetch(apiUrl)
      .then(function (response){
          if (response.ok) {
              response.json().then(function (data){
                  console.log(data)
                  latCoords = data.features[0].geometry.coordinates[1];
                  lonCoords = data.features[0].geometry.coordinates[0];
                  stateAndCountryQuery = data.features[0].properties.geocoding.label;
                  // search weather based on coordinates from openstreetmap
                  getQuery(latCoords, lonCoords);

                  locationQuery = data.features[0].properties.geocoding.name + ", " + getCountry(stateAndCountryQuery);

                  function getCountry(location) {
                    var countryArray = [];
                    var countryArray = location.split(",");
                    return location = countryArray.pop()
                  }
              })
          } 
      })
};



function getQuery(latitude, longitude) {

    var date;
    var weather
    var temp;
    var wind;
    var humidity;
    var uv;

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&units=metric&appid=bcab79206c70f6bc43884e90ada9c868")
      .then(function (response){
          if (response.ok) {
              response.json().then(function (data){
                  console.log(data);

                  date = data.current.dt
                  weather = data.current.weather[0].icon
                  temp = data.current.temp
                  wind = data.current.wind_speed
                  humidity = data.current.humidity
                  uv = data.current.uvi
                  displayWeatherToday(date, weather, temp, wind, humidity, uv);
              })
          }
      }); 
};

function displayWeatherToday(date, weather, temp, wind, humidity, uv) {

    var day = moment.unix(date).format("DD/MM/YYYY");

    subtitleEl.innerHTML = locationQuery + " (" + day + ")";
    var weatherIconImg = document.createElement("img");

    weatherIconImg.setAttribute("src", "http://openweathermap.org/img/wn/" + weather + ".png");

    subtitleEl.appendChild(weatherIconImg);

    var tempEl = document.createElement("P");
    var windEl = document.createElement("P");
    var humidityEl = document.createElement("P");
    var uvIndexEl = document.createElement("P");

    tempEl.textContent = "Temp: " + temp + "\xB0" + "C";
    windEl.textContent = "Wind: " + wind + "KMH";
    humidityEl.textContent = "Humidity: " + humidity + "46%";
    uvIndexEl.textContent = "UV Index: " + uv

    weatherContainerEl.appendChild(tempEl);
    weatherContainerEl.appendChild(windEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(uvIndexEl);
    


}



btnEl.addEventListener("submit", formSubmitHandler);