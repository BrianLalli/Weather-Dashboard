// pseudocode
// WHEN I view current weather conditions for that city
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = '728e469ada3cc76638230620501f3701'
var userSearch = ""
var testUrl = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
// Value from search form
var lat;
var lon;
var currentDate = moment().format("MMMM, Do, YYYY");
var date0 = moment().format("MMMM, Do, YYYY");
var date1 = moment().format("MMMM, Do, YYYY");
var date2 = moment().format("MMMM, Do, YYYY");
var date3 = moment().format("MMMM, Do, YYYY");
var date4 = moment().format("MMMM, Do, YYYY");
var currentUvIndex = document.querySelector('#currentUvIndex');


function getLatLon() {
    userSearch = $("#search-input").val()
    var geoAPIurl = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`
    fetch(geoAPIurl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            console.log("lat", data[0].lat)
            console.log("lon", data[0].lon)
            lat = data[0].lat
            lon = data[0].lon
            currentForecast();
        })
};


function currentForecast() {
    var weatherAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(weatherAPIUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            // APPEND TO PAGE 
            $("#currentTemp").text(data.current.temp)
            $("#currentWind").text(data.current.wind_speed)
            $("#currentHumidity").text(data.current.humidity)
            $("#currentUvIndex").text(data.current.uvi)
            $("#currentCity").text(userSearch)
            $("#currentDate").text(currentDate)
            // CHANGE BACKGROUND COLOR OF UV INDEX DEPENDING ON SEVERITY
            if (data.current.uvi <= 3) {
                $("#currentUvIndex").css("color", "green").append(" favorable", ["../icons/../icons/cloudy.svg"]);
            } else if (data.current.uvi >= 3.1 && data.current.uvi <= 6) {
                $("#currentUvIndex").css("color", "orange").append(" moderate", ["../icons/cloud-sun.svg"]);
            } else if (data.current.uvi >= 6.1 && data.current.uvi <= 10) {
                $("#currentUvIndex").css("color", "red",).append(" severe", ["../icons/sun.svg"]);
            } else if (data.current.uvi >= 10.1) {
                $("#currentUvIndex").css({ "color": "black", "font-size": "200%" });
            }
            // APPEND TO PAGE DAY 0
            $("#temp0").text(data.daily[0].temp.day)
            $("#wind0").text(data.daily[0].wind_speed)
            $("#humidity0").text(data.daily[0].humidity)
            $("#currentCity").text(userSearch)
            $("#date0").text(date0)
            // APPEND TO PAGE DAY 1
            $("#temp1").text(data.daily[1].temp.day)
            $("#wind1").text(data.daily[1].wind_speed)
            $("#humidity1").text(data.daily[1].humidity)
            $("#currentCity").text(userSearch)
            $("#date1").text(date1)
            // APPEND TO PAGE DAY 2
            $("#temp2").text(data.daily[2].temp.day)
            $("#wind2").text(data.daily[2].wind_speed)
            $("#humidity2").text(data.daily[2].humidity)
            $("#currentCity").text(userSearch)
            $("#date2").text(date2)
            // APPEND TO PAGE DAY 3
            $("#temp3").text(data.daily[3].temp.day)
            $("#wind3").text(data.daily[3].wind_speed)
            $("#humidity3").text(data.daily[3].humidity)
            $("#currentCity").text(userSearch)
            $("#date3").text(date3)
            // APPEND TO PAGE DAY 4
            $("#temp4").text(data.daily[4].temp.day)
            $("#wind4").text(data.daily[4].wind_speed)
            $("#humidity4").text(data.daily[4].humidity)
            $("#currentCity").text(userSearch)
            $("#date4").text(date4)
        })
};

$("#SearchBtn").on('click', getLatLon)

// SAVE TO LOCAL STORAGE
$("#SearchBtn").on('click', function () {
    var textToSave = $("#search-input").val();
    localStorage.setItem("userSearch", textToSave);
});
