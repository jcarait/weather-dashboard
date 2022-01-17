var cityInputEl = document.querySelector("#city");
var searchBtnEl = document.querySelector("#search-form");
var weatherContainerEl = document.querySelector("#weather-container");
var subtitleEl = document.querySelector(".subtitle");
var weatherIconEl = document.querySelector("#weather-icon");
var weatherForecastContainerEl = document.querySelector(".forecast-container")
var historyContainerEl = document.querySelector("#previous-search-buttons");
var clearBtnEl = document.querySelector(".btn-secondary");
var historyBtnEl;

var forecastData;
var weatherHistory;
var locationQuery;

apiKey = "bcab79206c70f6bc43884e90ada9c868"

function clearHistory () {
    while (historyContainerEl.firstChild) {
        historyContainerEl.removeChild(historyContainerEl.lastChild);
    }

    localStorage.clear();
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    while (weatherContainerEl.firstChild) {
        weatherContainerEl.removeChild(weatherContainerEl.lastChild);
    }

    while (weatherForecastContainerEl.firstChild) {
        weatherForecastContainerEl.removeChild(weatherForecastContainerEl.lastChild)
    }


    var city = cityInputEl.value;
    
    createHistoryButton(city);

    // city = city.replace(/\s+/g, "");
   

    if (city) {
        getCity(city);
    } else {
        alert("Please enter a city");
    };
};

// **this function is meant to deal with the query having multiple queries i.e. sydney, australia
// function convertLocation(query) {

//     
//     var queryArray = []
//     queryArray = query.split(",");
//     console.log(queryArray);
//     city = queryArray[0];
//     country = queryArray[1];
// }

function historyBtnHandler () {

    while (weatherContainerEl.firstChild) {
        weatherContainerEl.removeChild(weatherContainerEl.lastChild);
    }

    while (weatherForecastContainerEl.firstChild) {
        weatherForecastContainerEl.removeChild(weatherForecastContainerEl.lastChild)
    }

    var city = this.innerHTML;
    var country;
    
    var getStoredCity = localStorage.getItem(city);

    convertLocation(getStoredCity);

    function convertLocation(query) {

        //pushes string into an array to obtain first value which is the city
        var queryArray = []
        queryArray = query.split(",");
        city = queryArray[0];
    }

    getCity(city, country);

}




var getCity = function (city) {

    //Based on user input, the first search result is returned from the following API
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + apiKey

    console.log(apiUrl);

    fetch( apiUrl )
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    latCoords = data.coord.lat;
                    lonCoords = data.coord.lon;
                    // search weather based on coordinates from openstreetmap
                    
                    getQuery(latCoords, lonCoords);


                    locationQuery = data.name + ", " + data.sys.country

                    saveQuery(locationQuery);
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

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&units=metric&appid=" + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    date = data.current.dt
                    weather = data.current.weather[0].icon
                    temp = data.current.temp
                    wind = data.current.wind_speed
                    humidity = data.current.humidity
                    uv = data.current.uvi
                    displayWeatherToday(date, weather, temp, wind, humidity, uv);
                    

                    var fiveDayInt = 6;
                    var forecastArray = [];

                    //Loop 5 times to obtain 5-day weather forecast
                    for (var i = 0; i < fiveDayInt; i++) {
                        var forecastData = {
                            date: data.daily[i].dt,
                            weather: data.daily[i].weather[0].icon,
                            temp: data.daily[i].temp,
                            wind: data.daily[i].wind_speed,
                            humidity: data.daily[i].humidity
                        }
                        forecastArray.push(forecastData)
                    }

                    console.log(forecastArray);

                    for (var i = 1; i < forecastArray.length; i++) {

                        var forecastDate = forecastArray[i].date
                        var forecastWeather = forecastArray[i].weather
                        var forecastTemp = forecastArray[i].temp.day
                        var forecastWind = forecastArray[i].wind
                        var forecastHumidity = forecastArray[i].humidity

                        console.log(forecastDate, forecastWeather, forecastTemp, forecastWind, forecastHumidity)

                        displayWeatherForecast(forecastDate, forecastWeather, forecastTemp, forecastWind, forecastHumidity)

                    }

               


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
    humidityEl.textContent = "Humidity: " + humidity + "%";
    uvIndexEl.textContent = "UV Index: " + uv

    weatherContainerEl.appendChild(tempEl);
    weatherContainerEl.appendChild(windEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(uvIndexEl);
}

function displayWeatherForecast(date, weather, temp, wind, humidity) {

    var day = moment.unix(date).format("DD/MM/YYYY");

    var cardSubtitleEl
    var weatherIconImg
    var tempEl
    var windEl
    var humidityEl

        var cardEl = document.createElement("div");
        cardEl.setAttribute("class", "card forecast-card");
        weatherForecastContainerEl.appendChild(cardEl);

        cardSubtitleEl = document.createElement("h3");
        weatherIconImg = document.createElement("img");
        tempEl = document.createElement("P");
        windEl = document.createElement("P");
        humidityEl = document.createElement("P");

        cardEl.appendChild(cardSubtitleEl);
        cardEl.appendChild(weatherIconImg);
        cardEl.appendChild(tempEl);
        cardEl.appendChild(windEl);
        cardEl.appendChild(humidityEl);

        cardSubtitleEl.textContent =  "(" + day + ")"
        weatherIconImg.setAttribute("src", "http://openweathermap.org/img/wn/" + weather + ".png");
        tempEl.textContent = "Temp: " + temp + "\xB0" + "C";
        windEl.textContent = "Wind: " + wind + "KMH";
        humidityEl.textContent = "Humidity: " + humidity + "%";

}

function saveQuery(query) {

    localStorage.setItem(locationQuery, locationQuery);
};

function createHistoryButton(location) {

    var historyEl = document.createElement("button");
    historyEl.setAttribute("class", "btn btn-history");
    historyEl.innerHTML = location;
    historyContainerEl.appendChild(historyEl);

    historyEl.addEventListener("click", historyBtnHandler);
    historyBtnEl = historyEl;

};


function getSearchHistory () { 
    //loop through local storage data and create history buttons in history section
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = localStorage.getItem(key);
        
        if (item !== null) {
            createHistoryButton(item);
        }
    };
};

getSearchHistory();

searchBtnEl.addEventListener("submit", formSubmitHandler);
clearBtnEl.addEventListener("click", clearHistory)