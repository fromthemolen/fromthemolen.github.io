        $(document).ready(function () {
            var state;  //state of the boolean for the temperature
            getLocation(); // get location of the viewer by asking browser question



            function getLocation() {
                if ("geolocation" in navigator) { //check Geolocation available 
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var location = [position.coords.latitude, position.coords.longitude];
                        getWeather(location); //get the weather for the location
                        return;
                    });
                } 
                    var location = [36.204824, 138.252924];
                    getWeather(location);
             
                
            }

            function getWeather(location) {
                //e.preventDefault();
                $.ajax({
                    type: 'GET',
                    url: "https://fcc-weather-api.glitch.me/api/current?lat=" + location[0] + "&lon=" + location[1],
                    processData: true,
                    data: {},
                    dataType: "json",
                    success: function (data) { // check if json data is correct location
                        if(data.coord.lat == location[0].toFixed(2) && data.coord.lon == location[1].toFixed(2)){
                            data.error = false;

                            displayTemperature(data); //display temperature
                            toggleMetricSystem(data.main.temp); //toggle system
                            displayBackground(data.weather[0].main); //display various backgrounds
                        }else{
                            data.error = true;
                            displayTemperature(data);
                          
                            toggleMetricSystem(data.main.temp);
                            displayBackground(data.weather[0].main);


                        }
                    }
                });
            }
            function displayBackground(description) {
                if (description == 'Clear') {
                  $("#background").attr("src","https://fromthemolen.github.io/weather/clearsky.jpg");
                } else if (description == 'Clouds') {
                 $("#background").attr("src","https://fromthemolen.github.io/weather/clouds.jpg");                
                } else if (description == 'Drizzle') {
                $("#background").attr("src","https://fromthemolen.github.io/weather/showerrain.jpg");
                } else if (description == 'Rain') {
                  $("#background").attr("src","https://fromthemolen.github.io/weather/rain.jpg"); 

                } else if (description == 'Thunderstorm') {
                  $("#background").attr("src","https://fromthemolen.github.io/weather/thunderstorm.jpg"); 
                } else if (description == 'Snow') {
             $("#background").attr("src","https://fromthemolen.github.io/weather/snow.jpg"); 
                } else if (description == 'Mist') {
                  $("#background").attr("src","https://fromthemolen.github.io/weather/foggy.jpg"); 
                }
            }

            function toggleMetricSystem(temp) {
                $('button').click(function () {
                    if (state) {
                        state = !state;
                        $('button').html('&#8457;');
                        $('.container div span').html(temp.toFixed(0) + '&#8451;');
                    } else {
                        state = !state;
                        var far = temp * (9 / 5) + 32;
                        $('button').html('&#8451;');

                        $('.container div span').html(far.toFixed(0) + '&#8457;');

                    }
                });
            }



            function displayTemperature(data) {
                var post = data;
              if(data.error){
                                 $('.container div').html('incorrect data<br>'+post.name + ', ' + post.sys.country + '<br><span>' + post.main.temp.toFixed(0) + '&#8451;</span><button>&#8457;</button><br>' + post.weather[0].main);
              }else if(!post.weather[0].icon){
                         $('.container div').html('<button>&#8457;</button>'+ post.name + ', ' + post.sys.country + '<br><span>' + post.main.temp.toFixed(0) + '&#8451;</span><button>&#8457;</button><br>' + post.weather[0].main + '<br><img src=""/>');        
              }else{
                 $('.container div').html(post.name + ', ' + post.sys.country + '<br><span>' + post.main.temp.toFixed(0) + '&#8451;</span><button>&#8457;</button><br>' + post.weather[0].main + '<br><img src="' + post.weather[0].icon + ' "/>');
              }
            }
        });