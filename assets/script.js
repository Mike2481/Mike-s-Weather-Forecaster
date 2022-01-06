// variable to store API key
var APIKey = "64f10b724ca60e2b389d1dae4bebbd3f";

// global variables
var form = document.querySelector(".searchForm");
var searchBtn = document.querySelector("#search");
var cityEl = document.getElementById("city");
var list = document.querySelector(".cities");
var currentInfo = document.getElementById("currentInfo");

//https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=64f10b724ca60e2b389d1dae4bebbd3f

// function to get city input name to pass into queryURL
var getCity = function () {

    var city = cityEl.value;

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
            
            //`Temp: ${data.current.temp} degrees F`;
            // append your new element to the page
            currentInfo.append(cityNameEl, tempEl, windEl, humidityEl, uvIndexEl);
            uvIndexEl.appendChild(uvIndexColor);



            // if (uv < 3) {
            //   (data.current.uvi).interior.color = "green";
            // };

            console.log(data.current.uvi);


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
})
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
