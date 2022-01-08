// variable to store API key
var APIKey = "64f10b724ca60e2b389d1dae4bebbd3f";

// global variables
var form = document.querySelector(".searchForm");
var searchBtn = document.querySelector("#search");
var cityEl = document.getElementById("city");
var list = document.querySelector(".cities");
var currentInfo = document.getElementById("currentInfo");
var listResults = document.getElementById("results");
var forecastContainer = document.getElementById("forecastContainer");
// array that all searched cities will feed into
cityArray = JSON.parse(localStorage.getItem("cities")) || [];

//https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=64f10b724ca60e2b389d1dae4bebbd3f

// function to get city input name to pass into queryURL
var getCity = function () {
  if (city !== null && city !== "") {
    var city = cityEl.value.trim();

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    // fetch request to get data for entered city
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            // console.log(data);
            // Pull latitude and longitude values from data and pass to forecast function

            forecast(data.coord.lat, data.coord.lon, city);
          });
          // Error is response is not 'ok'
        } else {
          alert("City Not Found.  Please Check Spelling");
        }
      })
      // Error is an issue with site
      .catch(function (error) {
        alert("Unable to connect", error);
      });

    // clear the cityEl so values do not stack
    cityEl.value = "";
    // run functions for local storage
    saveCity(city);
    pastSearchCities();
  } else {
    alert("Please Enter A City Name");
  }
};
// function to handle clicked on saved searches
var runAgain = function (event) {
  event.preventDefault();
  var city = event.target.innerHTML;

  console.log(city);

  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  // fetch request to get data for entered city
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // Pull latitude and longitude values from data and pass to forecast function

          forecast(data.coord.lat, data.coord.lon, city);
        });
        // Error is response is not 'ok'
      } else {
        alert("City Not Found.  Please Check Spelling");
      }
    })
    // Error is an issue with site
    .catch(function (error) {
      alert("Unable to connect", error);
    });
  cityEl.value = "";
  // run functions for local storage
  pastSearchCities();
};

// get past search values from local storage and populate them in ul
function pastSearchCities() {
  var priorSearches = JSON.parse(localStorage.getItem("cities")) || [];
  console.log(priorSearches);
  list.innerHTML = "";
  // console.log(JSON.parse(localStorage.getItem("cities")));
  priorSearches.forEach((city) => {
    var cityText = document.createElement("li");
    cityText.textContent = city;
    cityText.classList.add("listItem");
    list.append(cityText);
    localStorage.setItem("cities", JSON.stringify(cityArray));
  });
}

// save search results in local storage for future use
var saveCity = function (city) {
  cityArray.push(city);
  localStorage.setItem("cities", JSON.stringify(cityArray));
};

var forecast = function (lat, long, city) {
  // second API will use lat and long from first API so we can get UV index
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${APIKey}`;
  // Fetch call to get all required data to use below
  fetch(oneCall)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("One Call API: ", data);

          // create elements for data
          var container = document.createElement("div");
          var cityNameEl = document.createElement("h3");
          var windEl = document.createElement("p");
          var tempEl = document.createElement("p");
          var humidityEl = document.createElement("p");
          var uvIndexEl = document.createElement("p");
          // this class works to impact UV DOM element
          //uvIndexEl.className = "uvColors";
          var uvIndexColor = document.createElement("span");
          var dateEl = document.createElement("span");
          var iconEl = document.createElement("img");

          //give element content
          container.classList.add("today");
          cityNameEl.textContent = city;
          windEl.textContent = `Wind spreed: ${data.current.wind_speed} mph`;
          tempEl.textContent = `Current Temp: ${data.current.temp} ° F`;
          humidityEl.textContent = `Humidity: ${data.current.humidity} % `;
          uvIndexEl.textContent = `UV Index: `;
          uvIndexColor.textContent = `${data.current.uvi}`;
          // Create rules to assign uv index color
          if (data.current.uvi <= 2) {
            uvIndexColor.classList = "favorable";
          } else if (data.current.uvi > 2 && data.current.uvi <= 8) {
            uvIndexColor.classList = "moderate";
          } else if (data.current.uvi > 8) {
            uvIndexColor.classList = "severe";
          }
          // get and display date
          var timestamp = `${data.current.dt}`;
          dateEl.textContent =
            "  " + new Date(timestamp * 1000).toLocaleDateString("en-US");
          // add icon to element
          icon = `${data.current.weather[0].icon}`;
          iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

          console.log(iconEl);
          // append your new element to the page
          document.getElementById("currentInfo").innerHTML = "";

          container.append(cityNameEl, dateEl, iconEl);
          currentInfo.append(container, tempEl, windEl, humidityEl, uvIndexEl);
          uvIndexEl.appendChild(uvIndexColor);

          // console.log(data.current.uvi);
          document.getElementById("forecastContainer").innerHTML = "";

          for (var i = 0; i < 5; i++) {
            // create variants for the 5 day forecast
            var box = document.createElement("div");
            var dailyWindEl = document.createElement("p");
            var dailyTempEl = document.createElement("p");
            var dailyDateEl = document.createElement("span");
            var dailyIconEl = document.createElement("img");
            var dailyHumidityEl = document.createElement("p");

            box.classList = "forecastBox";
            dailyWindEl.textContent = `Wind spreed: ${data.daily[i].wind_speed} mph`;
            dailyTempEl.textContent = `Temp: ${data.daily[i].temp.day} ° F`;
            dailyHumidityEl.textContent = `Humidity: ${data.daily[i].humidity} % `;

            var timestamp = `${data.daily[i].dt}`;
            dailyDateEl.textContent =
              "  " + new Date(timestamp * 1000).toLocaleDateString("en-US");
            // add icon to element
            icon = `${data.daily[i].weather[0].icon}`;
            dailyIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            box.append(
              dailyDateEl,
              dailyIconEl,
              dailyTempEl,
              dailyWindEl,
              dailyHumidityEl
            );
            forecastContainer.append(box);
          }
          // Display errors
        });
      } else {
        alert("City Not Found.  Please Check Spelling");
      }
    })

    .catch(function (error) {
      alert("Unable to connect", error);
    });
};

// event listener with prevent default for the form so it doesn't auto clear
form.addEventListener("click", function (event) {
  event.preventDefault();
});
// search button kicks off the getCity function to generate weather
searchBtn.addEventListener("click", getCity);
// allows the clicked on previous searches to generate weather
listResults.addEventListener("click", runAgain);
// initializes the past search function on screen open/refresh
pastSearchCities(city);

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
