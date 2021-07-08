var form = $("form");
var searchButton = $(".searchButton");
var inputField = $(".inputField")
var list = $("ol");
var weatherAPIKey = "b8b4d5904ac6a057855e021d45923ce6"
var locationAPIKey = "AIzaSyDkvCMpXS5TJliEFK4gUUq6v8MyB3Mo_rI"
var buttons = $("button").length;




//puts shadow around input field when in focus
inputField.focus(function() {
    $(this).css("box-shadow", "0 0 4px blue");
});
//removes shadow on blur
inputField.blur(function() {
    $(this).css("box-shadow", "none");
});

//inputs value of form into local storage
form.submit(function(event) {
    event.preventDefault();
    if (inputField.val().trim() == "") {
        inputField.css("box-shadow", "0 0 4px #811");
        alert("Please enter valid city name.");
        
    } else {  localStorage.setItem("city", inputField.val());
    
    }
    
    appendCityItem();

});

//appends local storage into button
function appendCityItem(event){

    var cityListItem = $("<button></button>");
    var cityInStorage = localStorage.getItem("city");
    cityListItem.text(cityInStorage).addClass("boom");
    list.append(cityListItem);
    
    getLocationAPI();

}

    //gets the location of city entered
    function getLocationAPI() {

        var cityName = inputField.val().trim();
        var requestLocationURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName + "&key=" + locationAPIKey;

        fetch(requestLocationURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            
            //gets the coordinates of city
            var results = data.results;
            for (var i = 0; i < results.length; i++) {
                var lat = results[i].geometry.location.lat;
                var lon = results[i].geometry.location.lng;
               
                //calls the weather info for the coordinates
                var requestWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + weatherAPIKey;
        
                fetch(requestWeatherURL)
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                    var date = data.current.dt;
                    day = moment.unix(date);
                    $(".main").addClass("main-weather");
                
                    //adds the date
                    $("h2").text(inputField.val() + " " + day.format("(M/D/YYYY)"));
                    var conditions = data.current.weather[0].main;

                    //adds icon of weather conditions
                    $(".icon-main").removeClass("fas fa-sun").removeClass("fas fa-cloud-showers-heavy").removeClass("fas fa-cloud").removeClass("fas fa-cloud-sun");

                    if (conditions == "Clear") {
                        $(".icon-main").addClass("fas fa-sun");
                    } else if (conditions == "Rain") {
                        $(".icon-main").addClass("fas fa-cloud-showers-heavy");
                    } else if (conditions == "Clouds") {
                        $(".icon-main").addClass("fas fa-cloud");
                    } else if (conditions == "Haze") {
                        $(".icon-main").addClass("fas fa-cloud-sun");
                    }

                    //appends the weather information into their sections on page for each of the five day forecasts
                    var temp = data.current.temp;
                    var wind = data.current.wind_speed;
                    var humidity = data.current.humidity;
                    var uvIndex = data.current.uvi;

                    $(".temp").text("Temp: " + temp + "°F");
                    $(".wind").text("Wind: " + wind + " MPH");
                    $(".humidity").text("Humidity: " + humidity + "%");
                    $(".uv").text("UV Index: ").append("<p class='inline'>" + uvIndex + "</p>");

                    $("h3").text("5-Day Forecast:");

                    var date = data.daily[1].dt;
                    day = moment.unix(date);
                    $(".A").text(day.format("M/D/YYYY"));
                    var conditions = data.daily[1].weather[0].main;

                    $(".icon1").removeClass("fas fa-sun").removeClass("fas fa-cloud-showers-heavy").removeClass("fas fa-cloud").removeClass("fas fa-cloud-sun");

                    if (conditions == "Clear") {
                        $(".icon1").addClass("fas fa-sun");
                    } else if (conditions == "Rain") {
                        $(".icon1").addClass("fas fa-cloud-showers-heavy");
                    } else if (conditions == "Clouds") {
                        $(".icon1").addClass("fas fa-cloud");
                    } else if (conditions == "Haze") {
                        $(".icon1").addClass("fas fa-cloud-sun");
                    }

                    $(".day1, .day2, .day3, .day4, .day5").addClass("forecast-styling");

                    var temp = data.daily[1].temp.day;
                    var wind = data.daily[1].wind_speed;
                    var humidity = data.daily[1].humidity;

                    $(".temp1").text("Temp: " + temp + "°F");
                    $(".wind1").text("Wind: " + wind + " MPH");
                    $(".humidity1").text("Humidity: " + humidity + "%");

                    var date = data.daily[2].dt;
                    day = moment.unix(date);
                    $(".B").text(day.format("M/D/YYYY"));
                    var conditions = data.daily[2].weather[0].main;

                    $(".icon2").removeClass("fas fa-sun").removeClass("fas fa-cloud-showers-heavy").removeClass("fas fa-cloud").removeClass("fas fa-cloud-sun");

                    if (conditions == "Clear") {
                        $(".icon2").addClass("fas fa-sun");
                    } else if (conditions == "Rain") {
                        $(".icon2").addClass("fas fa-cloud-showers-heavy");
                    } else if (conditions == "Clouds") {
                        $(".icon2").addClass("fas fa-cloud");
                    } else if (conditions == "Haze") {
                        $(".icon2").addClass("fas fa-cloud-sun");
                    }

                    var temp = data.daily[2].temp.day;
                    var wind = data.daily[2].wind_speed;
                    var humidity = data.daily[2].humidity;

                    $(".temp2").text("Temp: " + temp + "°F");
                    $(".wind2").text("Wind: " + wind + " MPH");
                    $(".humidity2").text("Humidity: " + humidity + "%");

                    var date = data.daily[3].dt;
                    day = moment.unix(date);
                    $(".C").text(day.format("M/D/YYYY"));
                    var conditions = data.daily[3].weather[0].main;

                    $(".icon3").removeClass("fas fa-sun").removeClass("fas fa-cloud-showers-heavy").removeClass("fas fa-cloud").removeClass("fas fa-cloud-sun");

                    if (conditions == "Clear") {
                        $(".icon3").addClass("fas fa-sun");
                    } else if (conditions == "Rain") {
                        $(".icon3").addClass("fas fa-cloud-showers-heavy");
                    } else if (conditions == "Clouds") {
                        $(".icon3").addClass("fas fa-cloud");
                    } else if (conditions == "Haze") {
                        $(".icon3").addClass("fas fa-cloud-sun");
                    }

                    var temp = data.daily[3].temp.day;
                    var wind = data.daily[3].wind_speed;
                    var humidity = data.daily[3].humidity;

                    $(".temp3").text("Temp: " + temp + "°F");
                    $(".wind3").text("Wind: " + wind + " MPH");
                    $(".humidity3").text("Humidity: " + humidity + "%");

                    var date = data.daily[4].dt;
                    day = moment.unix(date);
                    $(".D").text(day.format("M/D/YYYY"));
                    var conditions = data.daily[4].weather[0].main;

                    $(".icon4").removeClass("fas fa-sun").removeClass("fas fa-cloud-showers-heavy").removeClass("fas fa-cloud").removeClass("fas fa-cloud-sun");

                    if (conditions == "Clear") {
                        $(".icon4").addClass("fas fa-sun");
                    } else if (conditions == "Rain") {
                        $(".icon4").addClass("fas fa-cloud-showers-heavy");
                    } else if (conditions == "Clouds") {
                        $(".icon4").addClass("fas fa-cloud");
                    } else if (conditions == "Haze") {
                        $(".icon4").addClass("fas fa-cloud-sun");
                    }

                    var temp = data.daily[4].temp.day;
                    var wind = data.daily[4].wind_speed;
                    var humidity = data.daily[4].humidity;

                    $(".temp4").text("Temp: " + temp + "°F");
                    $(".wind4").text("Wind: " + wind + " MPH");
                    $(".humidity4").text("Humidity: " + humidity + "%");

                    var date = data.daily[5].dt;
                    day = moment.unix(date);
                    $(".E").text(day.format("M/D/YYYY"));
                    var conditions = data.daily[5].weather[0].main;

                    $(".icon5").removeClass("fas fa-sun").removeClass("fas fa-cloud-showers-heavy").removeClass("fas fa-cloud").removeClass("fas fa-cloud-sun");

                    if (conditions == "Clear") {
                        $(".icon5").addClass("fas fa-sun");
                    } else if (conditions == "Rain") {
                        $(".icon5").addClass("fas fa-cloud-showers-heavy");
                    } else if (conditions == "Clouds") {
                        $(".icon5").addClass("fas fa-cloud");
                    } else if (conditions == "Haze") {
                        $(".icon5").addClass("fas fa-cloud-sun");
                    }

                    var temp = data.daily[5].temp.day;
                    var wind = data.daily[5].wind_speed;
                    var humidity = data.daily[5].humidity;

                    $(".temp5").text("Temp: " + temp + "°F");
                    $(".wind5").text("Wind: " + wind + " MPH");
                    $(".humidity5").text("Humidity: " + humidity + "%");




                    
                    
                });
                    }
                });

      
        
    }
    //couldn't figure out how to get the buttons to click
   /* $(".inputField").on("click", function() {
        var button = $(".boom");
        alert(button.text());
    });*/
