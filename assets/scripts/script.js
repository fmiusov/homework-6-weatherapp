// ```
//=========================================================================================
// API KEY: 78ebcf5b45dec15369fc1101ca8eeb5d
// example call: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=78ebcf5b45dec15369fc1101ca8eeb5d
//=========================================================================================
// ```
$(document).ready(function() {
  //Generating this html so it doesn't recreate with every city call
  $("#week-forecast").prepend(
    $("<h3>5 Day Forecast:</h3>" + "<div class='d-block'>")
  );
  //Tried adding <br/>, d-blocks, empty rows, etc, nothing will get the forecast columns to move down
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
        var currentDate = new Date(response.dt * 1000).toLocaleDateString(
          "en-US"
        );
        $("#city-forecast").addClass("border border-dark rounded");
        $(".main-city-name").html(
          "<h2>" + response.name + " - " + currentDate + "</h2>"
        );
        //https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
        var iconNumber = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconNumber + ".png";
        $("#wicon").removeClass("collapse");
        $("#wicon").attr("src", iconURL);
        $(".description").html(
          "<h6>Currently: " + response.weather[0].description + "</h6>"
        );
        $(".description").addClass("text-muted");
        $(".temp").text("Temperature: " + response.main.temp + " F");
        $(".humidity").text("Humidity: " + response.main.humidity + " %");
        $(".wind").text("Wind Speed: " + response.wind.speed);

        var queryFive =
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          response.name +
          "&appid=" +
          apikey +
          "&units=imperial";
        var queryUV =
          "https://api.openweathermap.org/data/2.5/uvi?lat=" +
          response.coord.lat +
          "&lon=" +
          response.coord.lon +
          "&appid=" +
          apikey +
          "&units=imperial";
        //=========UV INDEX CALL==================//
        $.ajax({
          url: queryUV,
          method: "GET"
        }).then(function(response) {
          $(".uvindex").text("UV Index = " + response.value);
        });
        //===========FIVE DAY FORECAST CALL ==============//
        $.ajax({
          url: queryFive,
          method: "GET"
        }).then(function(response) {
          var dayOneDate = new Date(
            response.list[2].dt * 1000
          ).toLocaleDateString("en-US");
          $("#day1").html("<p>" + dayOneDate + "</p>");
          $("#day1").append("<p>Temp: " + response.list[2].main.temp + " F</p>")
          $("#day1").append("<p>Humidity: " + response.list[2].main.humidity + " %</p>")
          //========= ICON BROKEN BUT NOT SURE WHY ==============================================================
          // var icon1 = response.list[2].weather[0].icon;
          // var icon1URL = "http://openweathermap.org/img/w/" + icon1 + ".png";
          // $("#day1").append(
          //   $(
          //     "<div id='iconDay1'><img class = 'collapse' id='wicon1' src='' alt='Weather icon' />"
          //   )
          // );
          // $("#wincon1").attr("src", icon1URL);
          // console.log(icon1URL);
          // $("#wicon1").removeClass("collapse");
          //
          // URL CALL IS CORRECT
          // JQUERY CREATES ELEMENT CORRECTLY
          // JQUERY MODIFIES CORRECT ATTR
          // SRC ATTR COMES BACK INCORRECT
          //
          //=====================================================================================================
          $("#day1").addClass("bg-primary rounded text-white");
          var dayTwoDate = new Date(
            response.list[10].dt * 1000
          ).toLocaleDateString("en-US");
          $("#day2").html("<p>" + dayTwoDate + "</p>");
          $("#day2").append("<p>Temp: " + response.list[2].main.temp + " F</p>")
          $("#day2").append("<p>Humidity: " + response.list[2].main.humidity + " %</p>")
          $("#day2").addClass("bg-primary rounded text-white");
          var dayThreeDate = new Date(
            response.list[18].dt * 1000
          ).toLocaleDateString("en-US");
          $("#day3").html("<p>" + dayThreeDate + "</p>");
          $("#day3").append("<p>Temp: " + response.list[18].main.temp + " F</p>")
          $("#day3").append("<p>Humidity: " + response.list[18].main.humidity + " %</p>")
          $("#day3").addClass("bg-primary rounded text-white");
          var dayFourDate = new Date(
            response.list[26].dt * 1000
          ).toLocaleDateString("en-US");
          $("#day4").html("<p>" + dayFourDate + "</p>");
          $("#day4").append("<p>Temp: " + response.list[26].main.temp + " F</p>")
          $("#day4").append("<p>Humidity: " + response.list[26].main.humidity + " %</p>")
          $("#day4").addClass("bg-primary rounded text-white");
          var dayFiveDate = new Date(
            response.list[34].dt * 1000
          ).toLocaleDateString("en-US");
          $("#day5").html("<p>" + dayFiveDate + "</p>");
          $("#day5").append("<p>Temp: " + response.list[34].main.temp + " F</p>")
          $("#day5").append("<p>Humidity: " + response.list[34].main.humidity + " %</p>")
          $("#day5").addClass("bg-primary rounded text-white");
          console.log(response);
        });
      });
    });
  });
});
