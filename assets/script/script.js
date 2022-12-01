
var weatherApi = "dc7430f6a51b2b07de2c8f95ac3d9063";
var Url = "http://api.openweathermap.org/data/2.5/weather?q=ohio&appid=dc7430f6a51b2b07de2c8f95ac3d9063"
// Use get element by id to get the currentDay div from HTML
var currentDay = document.getElementById("currentDay");
var inputEl = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var lat;
var lon;
var weatherDays;
var cityName;

var currentDate = dayjs().format("dddd MMMM DD, YYYY");
$("#date").text(currentDate);


// https://openweathermap.org/current#name 
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//"http://api.openweathermap.org/data/2.5/weather?q=ohio&appid=dc7430f6a51b2b07de2c8f95ac3d9063"
//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApi;

//`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={dc7430f6a51b2b07de2c8f95ac3d9063}`

//"http://api.openweathermap.org/data/2.5/weather?q={ohio}&appid={dc7430f6a51b2b07de2c8f95ac3d9063}"

//fetch all the object



function firstCall() {
   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputEl.value}&appid=dc7430f6a51b2b07de2c8f95ac3d9063`)
      .then(function (response) {
         return response.json();

      })
      .then(function (data) {
        //  console.log(data);
         // Reassign var lat and var lon to equal the data lat and lon
         lat = data.coord.lat;
         // This line basically tells your computer to go into your data object, under the "coord" key, and look at the value of the key "lat"
         lon = data.coord.lon;
         secondCall();
      })
}


function secondCall() {
   fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=6&appid=dc7430f6a51b2b07de2c8f95ac3d9063`)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
        //  console.log(data);
         // Reassign the value of the weatherDays variable
         weatherDays = data.list;
         cityName = data.city.name;
         console.log(weatherDays);
         // call our display functions
         displayCurrent();
      })
}

// Build your function to display the current day temperature
function displayCurrent() {

   currentDay.innerHTML = "";
  
   // Create an element for your temperature
   var cityH1 = document.createElement("h1");
   var currentTemp = document.createElement("p");
   var currentWindSp = document.createElement("p");
   var humidity = document.createElement("p");
   // Add the temperature from our weatherDays[0] variable
   currentTemp.textContent = `Temperature: ${weatherDays[0].main.temp}`;
   cityH1.textContent = cityName;
   currentWindSp.textContent = `Wind Speed: ${weatherDays[0].wind.speed}`;
   humidity.textContent = `Humidity: ${weatherDays[0].main.humidity}`;
 

   // We list the div that we want to append the element to
   currentDay.append(cityH1);
   currentDay.append(currentTemp);
   currentDay.append(currentWindSp);
   currentDay.append(humidity);

 
   
}
//function fiveDayForecast
// Build your function to display the five day forecast
// Finish adding in the rest of your elements
// Create some elemnts for your date, city name, icon, temperature, wind speed, humidity
// Use create and append, textContent, make sure to clear fiveDayForecast div innerHTML (Like on line 59), loop


// LOCAL STORAGE ON FRIDAY


// add an event listener
searchButton.addEventListener("click", function (event) {
   event.preventDefault();
   firstCall();
});

