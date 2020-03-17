
// ```
//=========================================================================================
// API KEY: 78ebcf5b45dec15369fc1101ca8eeb5d
// example call: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=78ebcf5b45dec15369fc1101ca8eeb5d
//=========================================================================================
// ```
$(document).ready(function() {
  $("#submit-city").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#city-search").val();
    var cityButton = $("<li>").text(cityName);
    cityButton.addClass("list-group-item btn-light");
    $("#city-list").prepend(cityButton);
    $("input[type='text']").val(""); //to reset input field (this may cause error down the line, check back later)
    cityButton.on("click", function() {
      var apikey = "78ebcf5b45dec15369fc1101ca8eeb5d";
      var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        apikey +
        "&units=imperial";
        //==========CURRENT FORECAST CALL============//
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
        var currentDate = new Date(response.dt * 1000).toLocaleDateString("en-US")
        $("#city-forecast").addClass("border border-dark rounded");
        $(".main-city-name").html("<h2>" + response.name + " - " + currentDate + "</h2>");
        //https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
        var iconNumber = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconNumber + ".png";
        $("#wicon").removeClass("collapse");
        $("#wicon").attr("src", iconURL);
        $(".description").html(
          "<h6>Currently: " + response.weather[0].description + "</h6>"
        );
        $(".description").addClass("text-muted");
        $(".temp").text("Temperature: " + response.main.temp + "F");
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        console.log(response)
        var queryUV =
          "https://api.openweathermap.org/data/2.5/uvi?lat=" +
          response.coord.lat +
          "&lon=" +
          response.coord.lon +
          "&appid=" +
          apikey;
        //=========UV INDEX CALL==================//
        $.ajax({
          url: queryUV,
          method: "GET"
        }).then(function(response) {
          $(".uvindex").text("UV Index = " + response.value);
        });
        //===========FIVE DAY FORECAST CALL ==============//
        $.ajax({

        })
      });
    });
  });
});

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
