// variable to store API key
var APIKey = "64f10b724ca60e2b389d1dae4bebbd3f";

// global variables
var form = document.querySelector(".searchForm");
var searchBtn = document.querySelector("#search");
var cityEl = document.getElementById("city");
var list = document.querySelector(".cities");
var currentInfo = document.getElementById("currentInfo");
cityArray = [];

//https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=64f10b724ca60e2b389d1dae4bebbd3f

// function to get city input name to pass into queryURL
var getCity = function () {
  var city = cityEl.value.trim();

  var queryURL =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
// fetch request to get data for entered city
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
// Pull latitude and longitude values from data and pass to forecast function 

          forecast(data.coord.lat, data.coord.lon, city)
        });
        // Error is response is not 'ok'
      } else {
        alert("Error");
      }
    })
    // Error is an issue with site
     .catch(function (error) {
       alert("Unable to connect", error);
     });
     cityEl.value = ""
     saveCity(city);
      pastSearchCities(city);
};




// able to get cities to populate in the Ul but not individual li 
var cityCount = 0

// var pastSearchCities = function () {
  // for (i = 0; i < localStorage.length; i++)
  //   if(localStorage.key(i).indexOf("cities") !== -1) {
  //     var oldSearch = document.createElement("li");
  //     oldSearch.textContent = JSON.parse(localStorage.getItem(localStorage.key(i)));
  //     list.appendChild(oldSearch);
  //     cityCount++;
    // }
// }
function pastSearchCities() {
  var priorSearches = JSON.parse(localStorage.getItem("cities"));

    priorSearches.forEach(generateList);

  // for (i = 0; i < priorSearches.length; i++) {
  //   const oldSearch = priorSearches[i];
  //   console.log(oldSearch);
  //   var searchList = document.createElement("li");
  //   searchList.textContent = oldSearch;
  //   list.append(oldSearch);
  // }
  // if (priorSearches != null && priorSearches.length < 1){
    // cityArray.forEach(arrayValue => console.log(arrayValue));
  // for (var i = 0; i < priorSearches.length; i++){
  //   // results.append(priorSearches[i]);
  //     var oldSearch = document.createElement("li");
  //     oldSearch.textContent = priorSearches[i]
  //     list.append(oldSearch);
  //     priorSearches++;
  // priorSearches.forEach(cityText => {
  //   for (var i = 0; i < priorSearches.length; i++){
  //   cityText = document.createElement("li");
  //   cityText.textContent = priorSearches[i];
  //   var oldSearch = document.querySelectorAll("li");
  //   console.log(cityText.textContent);
  //   list.append(oldSearch);
  // };
  // console.log(priorSearches);
};
var generateList = function(city) {
  var cityText = document.createElement("li");
  cityText.textContent = city
  console.log(city);
  list.append(city);
}


;

var saveCity = function(city) {
  cityArray.push(city);
  localStorage.setItem("cities", JSON.stringify(cityArray));
};



var forecast = function (lat, long, city) {
// second API will use lat and long from first API so we can get UV index
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${APIKey}`;

  fetch(oneCall)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("One Call API: ", data);

            // create elements for data
            var cityNameEl = document.createElement ("h3");
            var windEl = document.createElement ("p");
            var tempEl = document.createElement ("p");
            var humidityEl = document.createElement ("p");
            var uvIndexEl = document.createElement ("p");
            // this class works to impact UV DOM element
            //uvIndexEl.className = "uvColors";
            var uvIndexColor = document.createElement ("span");



            //give element content
            cityNameEl.textContent = city
            windEl.textContent = `Wind spreed: ${data.current.wind_speed} mph`
            tempEl.textContent = `Current Temp: ${data.current.temp} degrees F`
            humidityEl.textContent = `Humidity: ${data.current.humidity} % `
            uvIndexEl.textContent = `UV Index: `
            uvIndexColor.textContent = `${data.current.uvi}`

            if(data.current.uvi <= 2) {
              uvIndexColor.classList = "favorable"
            } else if (data.current.uvi >2 && data.current.uvi <=8) {
              uvIndexColor.classList = "moderate"
            } else if (data.current.uvi >8) {
              uvIndexColor.classList = "severe"
            }
            
            // append your new element to the page
            document.getElementById("currentInfo").innerHTML = "";
            currentInfo.append(cityNameEl, tempEl, windEl, humidityEl, uvIndexEl);
            uvIndexEl.appendChild(uvIndexColor);

            console.log(data.current.uvi);

      // Data is staying when new search is performed.  Need a way to clear it once new search is started


        });
      } else {
        alert("Error");
      }
    })

    .catch(function (error) {
      alert("Unable to connect", error);
      
    });
};

form.addEventListener("click", function(event){
    event.preventDefault();

    // currentInfo = "";
    });
    //     var city = cityInputEl.value.trim();
searchBtn.addEventListener("click", getCity);

// navigator.geolocation.getCurrentPosition(getCity);

// UV index is only available with one call api

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// one call api uses lat and long so I need to convert the city input into lat and long somehow
// need event listener to send city to function that converts to lat and long
// need a function to feed city, date, and icon into currentInfo header
// need span set up for temp, wind, humidity, and uv index
// need weather array data sent to spans
// need valid search results saved to local storage and displayed in ul
// need 5 day forecast displayed in div - needs date, icon, temp, wind, humidity
//ICON NOTES
// iconImgEl.setAttribute("src", imageIcon variable)
