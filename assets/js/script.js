function getCity() {
    fetch("https://nominatim.openstreetmap.org/search?city=sydney&format=geocodejson");
}

function getApi() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}")

    
}