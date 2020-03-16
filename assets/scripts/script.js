// build a weather dashboard that will run in the browser and 
//     feature dynamically updated HTML and CSS. 
//     Use `localStorage` to store any persistent data. 
    
// ``` 
// AS A traveler 
// I WANT to see the weather outlook for multiple cities 
// SO THAT I can plan a trip accordingly 
// ``` 
    
// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city//

$("#submit-city").on("click", function(event) {
    event.preventDefault()
    var cityName = $("#city-search").val()
    var cityButton = $("<li>").text(cityName)
    cityButton.addClass("list-group-item")
    $("#city-list").prepend(cityButton)
    $("input[type='text']").val(""); //to reset input field (this may cause error down the line, check back later)
})



// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
// ``` 
   