//Api key 
var weatherApi = "dc7430f6a51b2b07de2c8f95ac3d9063";
//Url for weather
var Url = "http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api}"
// Use get element by id to get the currentDay div from HTML
var currentDay = document.getElementById("currentDay");
// user city input 
var inputEl = document.getElementById("search-input");
//button for city
var searchButton = document.getElementById("search-button");
var lat;
var lon;
// var for the 5 days of the weather
var weatherDays;
// var for the city input
var cityName;
var fiveDayForecast = document.getElementById("fiveDayFor");
//Date for the current day 
var currentDate = dayjs().format(" MMM DD, YYYY");
$("#date").text(currentDate);

//first call api with the city input and json 
function firstCall() {
   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputEl.value}&appid=dc7430f6a51b2b07de2c8f95ac3d9063`)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         lat = data.coord.lat;
         lon = data.coord.lon;
         secondCall();
      })
}

// second call api 
function secondCall() {
   fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=6&appid=dc7430f6a51b2b07de2c8f95ac3d9063`)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         // Reassign the value of the weatherDays variable
         weatherDays = data.list;
         cityName = data.city.name ;
         console.log(weatherDays);
         // call our display functions
         saveStorage();
         displayPastSearches();
         displayCurrent();
      })
}

