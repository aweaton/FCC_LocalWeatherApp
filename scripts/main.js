
function getLocation() {
  var locationURL = "http://ip-api.com/json";
  console.log("testing")
  $.ajax({

    url: locationURL,
    data: {
      format: 'json'
    },
    dataType: "jsonp",
    success: function(data) {
      //still nested inside another function
      //console.log(data.lat);
      //console.log(data.lon);
      var lat = data.lat;
      var long = data.lon;
      console.log(lat);
      console.log(long);
      //run getWeather function here:
      getWeather(lat, long);
      //var long = data.lon;
    },
    type: 'GET'
  });
  //console.log(lat)
}

function getWeather(lat, long) {
  var weatherurl = `http://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${long}&appid=5e286723a98f9d47aa2777bf34930d3b`;
  console.log(weatherurl)
  $.ajax({

    url: weatherurl,
    data: {
      format: 'json'
    },
    dataType: "jsonp",

    success: function(weather) {
      if (weather) {
        console.log(weather.sys.country);
        console.log(weather.name);
        $("#location").html(weather.name + "," + weather.sys.country );
        
        console.log(weather.main.temp);
        console.log(weather.weather[0].main);
        var temp = Math.round(weather.main.temp)
        console.log(temp)
        ///$("#weather").html(temp + "°C<br>" + weather.weather[0].main)
        $("#temp").html(temp)
        $("#conditions").html("<br>" + weather.weather[0].main)
        
        console.log(weather.weather[0].icon);
        
        $("#icon").html('<img src="http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png"' + 'alt="...">');
      } else {
        console.log("somthing is not working");
      }
    },
    type: "GET"
  });
}

// function to switch from C/F

getLocation()
$("#convert").on("click", function() {
  if ($("#convert").text() === "°C"){
    var temp = parseInt($("#temp").text());
    var fTemp = Math.round(temp * 9/5 + 32);
    $("#temp").html(fTemp);
    console.log(temp);
    $("#convert").html("°F");
  }
  else {
    var temp = parseInt($("#temp").text());
    var cTemp = Math.round((temp - 32)*5/9);
    $("#temp").html(cTemp)
    $("#convert").html("°C");
  }
  
  
});
