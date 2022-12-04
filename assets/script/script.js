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

// Build your function to display the current day temperature
function displayCurrent() {

   currentDay.innerHTML = "";
   // elements for temperature, icon, city, wind and humidity
   var weatherIcon = document.createElement('img');
   var cityH1 = document.createElement("h1");
   var currentTemp = document.createElement("p");
   var currentWindSp = document.createElement("p");
   var humidity = document.createElement("p");
   //adding elements to collect the data 
   currentTemp.textContent = `Temperature: ${weatherDays[0].main.temp+" °F"}`;
   cityH1.textContent = cityName;
   weatherIcon.src = `http://openweathermap.org/img/wn/${weatherDays[0].weather[0].icon}@2x.png`
   currentWindSp.textContent = `Wind Speed: ${weatherDays[0].wind.speed+" MPH"}`;
   humidity.textContent = `Humidity: ${weatherDays[0].main.humidity+" %"}`;

    // We list the div that we want to append the element to
    currentDay.append(cityH1);
    currentDay.append(weatherIcon);
    currentDay.append(currentTemp);
    currentDay.append(currentWindSp);
    currentDay.append(humidity);
 
    fiveDayFore();
}
// display the five day forecast 
function fiveDayFore() {
   fiveDayForecast.innerHTML = "";
   var h2 = document.createElement('h2');
   h2.textContent = "Five Day Forecast";
   fiveDayForecast.append(h2);
   //loop for the 5 day forecast
   for (let index = 1; index < weatherDays.length; index++) {
      // get current date and the 5 days more 
      var date = new Date();
     date.setDate(date.getDate()+ index)
     // set a format for date 
     let formatDate = date.toLocaleDateString('en-US',{
      dateStyle:'long'
     })
     // create elements for the five days data 
     var fiveDayBox = document.createElement('div');
     var iconPerDay = document.createElement("img");
     var datePerDay = document.createElement("p");
     var temperatureEl = document.createElement("p");
     var windEl = document.createElement("p");
     var humidityEl = document.createElement("p");
     iconPerDay.src = `http://openweathermap.org/img/wn/${weatherDays[index].weather[0].icon}@2x.png`
     datePerDay.textContent = formatDate;
     temperatureEl.textContent = `Temp: ${weatherDays[index].main.temp+" °F"}`;
     windEl.textContent = `Wind Speed: ${weatherDays[index].wind.speed+" MPH"}`;
     humidityEl.textContent = `Humidity: ${weatherDays[index].main.humidity+" %"}`;
     fiveDayBox.append(iconPerDay);
       fiveDayBox.append(datePerDay);
       fiveDayBox.append(temperatureEl);
       fiveDayBox.append(windEl);
       fiveDayBox.append(humidityEl);
       fiveDayForecast.append(fiveDayBox);