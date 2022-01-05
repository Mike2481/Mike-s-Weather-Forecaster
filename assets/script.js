 var APIKey = "64f10b724ca60e2b389d1dae4bebbd3f";
 var form = document.querySelector(".searchForm");
 var city = document.getElementById("city");
 var list = document.querySelector(".cities");


 var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=" + APIKey;

 
 fetch(queryURL)
 .then(function (response) {
     if (response.ok) {
        response.json().then(function(data) {
        console.log(data);
        });
     } else {
         alert("Error")
     }
    })

    .catch(function(error) {
        alert("Unable to connect", error);

    });


 form.addEventListener("click", function (event) {
     event.preventDefault();
 })