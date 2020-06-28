$(document).ready(function () {



    function currentConditions(city) {
        var key = "99554349f5c7a971498fc2a3291419d9"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var currentWeather = $("#currentweather-view");
            var city = $("<h2>").html("City: " + response.name);
            var temp = $("<p>").html("Temperature: " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1) + " F");
            var humidity = $("<p>").html("Humidity: " + response.main.humidity + "%")
            var wind = $("<p>").html("Wind speed " + response.wind.speed + "mph")

            var latitude = response.coord.lat
            var longitude = response.coord.lon
            console.log(latitude)
            console.log(longitude)

            uvIndex(latitude, longitude);

            currentWeather.append(city, temp, humidity, wind)
        });

        futureWeather(city);

    }

    function uvIndex(latitude, longitude) {
        var key = "99554349f5c7a971498fc2a3291419d9"
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + latitude + "&lon=" + longitude
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var uvIndexCity = $("<p>").html("UV Index: " + response.value);
            $("#currentweather-view").append(uvIndexCity);
        });
    }

    function futureWeather(city) {
        var key = "99554349f5c7a971498fc2a3291419d9"
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // This clear would clear everything and not allow anything to appear after
            // $("#fivedayweather-view").empty();
            $("#fivedayweather-view").removeClass("hide");

            console.log(response)
            var dayOne = $("#1");
            dayOne.html("<h4>Day One:</h4>")
            var conditionsOne = $("<p>").html("Weather conditions: " + response.list[0].weather[0].main);
            var temperatureOne = $("<p>").html("Temperature: " + ((response.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(1) + " F");
            var humidityOne = $("<p>").html("Humidity: " + response.list[0].main.humidity + "%");
            dayOne.append(conditionsOne, temperatureOne, humidityOne);

            var dayTwo = $("#2");
            dayTwo.html("<h4>Day Two:</h4>")
            var conditionsTwo = $("<p>").html("Weather conditions: " + response.list[1].weather[0].main);
            var temperatureTwo = $("<p>").html("Temperature: " + ((response.list[1].main.temp - 273.15) * 1.80 + 32).toFixed(1) + " F");
            var humidityTwo = $("<p>").html("Humidity: " + response.list[1].main.humidity + "%");
            dayTwo.append(conditionsTwo, temperatureTwo, humidityTwo);

            var dayThree = $("#3");
            dayThree.html("<h4>Day Three:</h4>")
            var conditionsThree = $("<p>").html("Weather conditions: " + response.list[2].weather[0].main);
            var temperatureThree = $("<p>").html("Temperature: " + ((response.list[2].main.temp - 273.15) * 1.80 + 32).toFixed(1) + " F");
            var humidityThree = $("<p>").html("Humidity: " + response.list[2].main.humidity + "%");
            dayThree.append(conditionsThree, temperatureThree, humidityThree);

            var dayFour = $("#4");
            dayFour.html("<h4>Day Four:</h4>")
            var conditionsFour = $("<p>").html("Weather conditions: " + response.list[3].weather[0].main);
            var temperatureFour = $("<p>").html("Temperature: " + ((response.list[3].main.temp - 273.15) * 1.80 + 32).toFixed(1) + " F");
            var humidityFour = $("<p>").html("Humidity: " + response.list[3].main.humidity + "%");
            dayFour.append(conditionsFour, temperatureFour, humidityFour);

            var dayFive = $("#5");
            dayFive.html("<h4>Day Five:</h4>")
            var conditionsFive = $("<p>").html("Weather conditions: " + response.list[4].weather[0].main);
            var temperatureFive = $("<p>").html("Temperature: " + ((response.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(1) + " F");
            var humidityFive = $("<p>").html("Humidity: " + response.list[4].main.humidity + "%");
            dayFive.append(conditionsFive, temperatureFive, humidityFive);

        });
    }

    $("#get-weather").on("click", function (event) {
        event.preventDefault();
        $("#currentweather-view").empty();
        var inputCity = $(".form-control").val().trim();
        var button = $("<button>");
        button.text("city", inputCity);
        $("#searches-view").prepend(button);
        currentConditions(inputCity);
        $(".form-control").val("");
    });


});