var APIKey = "64f10b724ca60e2b389d1dae4bebbd3f";
var form = document.querySelector(".searchForm");
var searchBtn = document.querySelector("#search");
var cityEl = document.getElementById("city");
var list = document.querySelector(".cities");
var currentInfo = document.getElementById("currentInfo");

//https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=64f10b724ca60e2b389d1dae4bebbd3f
// function to
var getCity = function () {

    var city = cityEl.value;
    console.log("city input: ", city)
  // does this need to be a function to pass lat, long into?
  var queryURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
         // console.log(data);

          //console.log(data.coord.lat);
          forecast(data.coord.lat, data.coord.lon, city)
        });
      } else {
        alert("Error");
      }
    })
     .catch(function (error) {
       alert("Unable to connect", error);
     });
};



var forecast = function (lat, long, city) {

    console.log("I'm being called!!!!")
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${APIKey}`;

  fetch(oneCall)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("One Call API: ", data);

            // create element
            var cityNameEl = document.createElement ("h3");
            var windEl = document.createElement ("p");
            var tempEl = document.createElement ("p");
            var humidityEl = document.createElement ("p");
            var uvIndexEl = document.createElement ("p");
            uvIndexEl.className = "uvColors";
            // this class works to impact UV DOM element


            //give element content
            cityNameEl.textContent = city
            windEl.textContent = `Wind spreed: ${data.current.wind_speed} mph`
            tempEl.textContent = `Current Temp: ${data.current.temp} degrees F`
            humidityEl.textContent = `Humidity: ${data.current.humidity} % `
            uvIndexEl.textContent = `UV Index: ${data.current.uvi}`
            
            //`Temp: ${data.current.temp} degrees F`;
            // append your new element to the page
            currentInfo.append(cityNameEl, tempEl, windEl, humidityEl, uvIndexEl);
            console.log(data.current.uvi);
            var uv = data.current.uvi;

            // if (uv < 3) {
            //   (data.current.uvi).interior.color = "green";
            // };


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
