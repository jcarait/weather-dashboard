var cityInputEl = document.querySelector("#city");
var btnEl = document.querySelector("#search-form");
var weatherContainerEl = document.querySelector("#weather-container");

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

    var apiUrl = "https://nominatim.openstreetmap.org/search?city=" + city + "&format=geocodejson";

    fetch(apiUrl)
      .then(function (response){
          if (response.ok) {
              response.json().then(function (data){
                  console.log(data)
                  latCoords = data.features[0].geometry.coordinates[1];
                  lonCoords = data.features[0].geometry.coordinates[0];
                  getQuery(latCoords, lonCoords);
                  locationQuery = data.features[0].properties.geocoding.label;
                  console.log(latCoords,lonCoords);
              })
          } 
      })
};



function getQuery(latitude, longitude) {

    var cityData;
    var date;
    var temp;
    var wind;
    var humidity;

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&units=metric&appid=bcab79206c70f6bc43884e90ada9c868")
      .then(function (response){
          if (response.ok) {
              response.json().then(function (data){
                  console.log(data);


              })
          }
      }); 
};

var displayWeatherToday = function (city, date, temp, wind, humidity, uv) {
    if (!city.length) {
        weatherContainerEl.textContent = "City not found.";
        return
    }
    
}

btnEl.addEventListener("submit", formSubmitHandler);