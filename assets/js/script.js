var cityEl = document.querySelector("#city");
var btnEl = document.querySelector(".btn");

// var formSubmitHandler = function (event) {
//     event.preventDefault();

//     var city = cityEl.value.trim();

//     if (city) {
//         getCity(city);
//     } else {
//         alert("Please enter a city");
//     };
// };

var getCity = function (city) {
    var apiUrl = "https://nominatim.openstreetmap.org/search?city=" + city + "&format=geocodejson";

    fetch(apiUrl)
      .then(function (response){
          if (response.ok) {
              console.log(response);
              response.json().then(function (data){
                  console.log(data);
              })
          }
      });
};

getCity("sydney");



function getApi() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}")

    
}

// btnEl.addEventListener("submit", formSubmitHandler);