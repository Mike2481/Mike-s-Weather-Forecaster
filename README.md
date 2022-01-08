# Weather-Dashboard
This challenge was to create a weather dashboard that can be used to see current weather as well as the weather outlook for multiple cities.

## End Result

In the end, I was able to create a functioning weather dashboard with all the required features.  
The site being fully responsive was not a requirement, but I think it's something I'll add later on.  


## Challenges

The weather app challenged me quite a bit.  I ran into an issue with storing previous search results and recalling them.  Initially, I had the values feeding into an empty array.  This was causing the array to reset each time the page was refreshed.  I was able to resolve the issue by passing the local storage values into the array and setting up an "or" for the initial empty array required.
Getting the 5-day forecast to populate properly was a challenge too.  I was able to utilize a for loop to get the needed values, but could not get a separate div for each iteration. This was a syntax error that was resolved by relocating the code clearing out the div html content to outside the function.

## Deployed Page

The deployed page can be seen by following the [link](https://mike2481.github.io/Weather-Dashboard/)


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

![screenshot of deployed application](assets/images/weather-dashboard.png?raw=true "Weather Dashboard")