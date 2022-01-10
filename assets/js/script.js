var cityInputEl = document.querySelector("#city");
var btnEl = document.querySelector("#search-form");

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
                  latCoords = data.features[0].geometry.coordinates[1];
                  lonCoords = data.features[0].geometry.coordinates[0];
                  getQuery(latCoords, lonCoords);
                  console.log(latCoords,lonCoords);
              })
          } 
      })
};



function getQuery(latitude, longitude) {

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&units=metric&appid=bcab79206c70f6bc43884e90ada9c868")
      .then(function (response){
          if (response.ok) {
              response.json().then(function (data){
                  console.log(data);
              })
          }
      }); 
};

var displayWeatherToday = function (temp, wind, humidity, uv) {

    
}

btnEl.addEventListener("submit", formSubmitHandler);