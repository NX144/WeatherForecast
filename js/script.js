fetch('https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=metric&appid=8cb414b6309886a3b93b59e9f1b5695b')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);

        // Get elements:
        console.log(data.weather[0]['description']);
        let cityBlock = document.querySelector('.city'),    // City, Город проживания
            yearUser = document.querySelector('.year'),
            countryBlock = document.querySelector('.country'),
            timeBlock = document.querySelector('.time'),  //Block for time, блок для показа времени
            descrWeather = document.querySelector('.weather-info-descr'),    //Description weather, Описание погоды
            temp = document.querySelector('.weather-temp'),    //Block for temperature, блок для показа температуры
            likeTemp = document.querySelector('.weather-descr > span'),
            pressure = document.querySelector('.weather-pressure > span'),   //Pressure, давление воздуха
            humidityWeather = document.querySelector('.weather-humidity > span'),    //Humidity, влажность
            weatherSpeed = document.querySelector('.weather-speed-wind >  span'),
            sunriseCity = document.querySelector('.span-sunrise'),
            sunsetCity = document.querySelector('.span-sunset'),
            weatherDescrInfo = data.weather[0]['description'],
            pressureSpan = document.querySelector('.pressure-span'),
            humiditySpan = document.querySelector('.humidity-span'),
            speedWind = document.querySelector('.wind-span'),
            pressureValue = "",
            humidityWeatherNum = "";

        // Fill to blocks:


        getDatese = setTimeout(function tick() {
            let dayTime = data.dt;
            let dateTimeToday = new Date((dayTime + data.timezone)*1000);
            let datesrCondition1 = dateTimeToday.getUTCHours();
            let datesrCondition2 = dateTimeToday.getMinutes();
            if(datesrCondition1 < 10 && datesrCondition1 >= 0) {
                datesrCondition1 = "0" + dateTimeToday.getUTCHours();
            }
            if(datesrCondition2 < 10 && datesrCondition2 >= 0) {
                datesrCondition2 = "0" + dateTimeToday.getMinutes();
            }
            dateTimeToday = datesrCondition1 + ":" + datesrCondition2;
            timeBlock.innerHTML = dateTimeToday;
            getDatese = setTimeout(tick, 1000);
        }, 1000);

        
        cityBlock.innerHTML = data.name;
        countryBlock.innerHTML = data.sys['country'];
        temp.innerHTML = "+" + Math.round(data.main['temp']) + "&deg;";

        switch(weatherDescrInfo) {
            case "clear sky":
                descrWeather.innerHTML = "Солнечно";
                break;
            case "scattered clouds":
                descrWeather.innerHTML = "Рассеянная облачность";
                break;
            case "few clouds":
                descrWeather.innerHTML = "Малооблачно";
                break;
            case "broken clouds":
                descrWeather.innerHTML = "Облачно";
                break;
            case "overcast clouds":
                descrWeather.innerHTML = "Пасмурно";
                break;
            case "light intensity drizzle":
                descrWeather.innerHTML = "Моросящий дождь";
                break;
            case "light rain":
                descrWeather.innerHTML = "Небольшой дождь";
                break;
        }
        document.querySelector('.weather-info-image').innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.weather[0]['icon'] +'@2x.png" alt="img-weather" class="image-block">';

        likeTemp.innerHTML = (data.main['feels_like'].toFixed(1)) + "&deg;C";
        pressure.innerHTML = Math.floor(data.main['pressure'] / 1.345);
        pressureValue = pressure.innerHTML;

        if(pressureValue >= "745" && pressureValue <= "765") {
            pressureSpan.innerHTML = " нормальное";
        } else if(pressureValue > "765" && pressureValue <= "775"){
            pressureSpan.innerHTML = " выше среднего";
        } else if(pressureValue > "775") {
            pressureSpan.innerHTML = " высокое";
        } else if(pressureValue < "745" && pressureValue >= "735") {
            pressureSpan.innerHTML = " ниже среднего";
        } else if(pressureValue < "735") {
            pressureSpan.innerHTML = " низкое";
        } else {
            return 1;
        }


        humidityWeather.innerHTML = data.main['humidity'] + "%";
        humidityWeatherNum = data.main['humidity'];

        if(humidityWeatherNum >= '0' && humidityWeatherNum <= '10') {
            humiditySpan.innerHTML = "очень низкая";
        } else if(humidityWeatherNum > '10' && humidityWeatherNum <= '30') {
            humiditySpan.innerHTML = "низкая";
        } else if(humidityWeatherNum > '30' && humidityWeatherNum <= '40') {
            humiditySpan.innerHTML = "ниже среднего";
        } else if(humidityWeatherNum > '40' && humidityWeatherNum <= '60') {
            humiditySpan.innerHTML = "комфортная";
        } else if(humidityWeatherNum > '60' && humidityWeatherNum <= '70') {
            humiditySpan.innerHTML = "выше среднего";
        } else if(humidityWeatherNum > '70' && humidityWeatherNum <= '80') {
            humiditySpan.innerHTML = "высокая";
        } else if (humidityWeatherNum > '80' && humidityWeatherNum <= '100') {
            humiditySpan.innerHTML = "очень высокая";
        } else {
            return 1;
        }


        weatherSpeed.innerHTML =  Math.floor(data.wind['speed']);
        weatherSpeedInfo = Math.floor(data.wind['speed']);

        if(weatherSpeedInfo >= 0 && weatherSpeedInfo <= 1) {
            speedWind.innerHTML = "тихий";
        } else if(weatherSpeedInfo > 1 && weatherSpeedInfo <= 3) {
            speedWind.innerHTML = "легкий";
        } else if(weatherSpeedInfo > 3 && weatherSpeedInfo <= 5) {
            speedWind.innerHTML = "слабый";
        } else if(weatherSpeedInfo > 5 && weatherSpeedInfo <= 8) {
            speedWind.innerHTML = "умеренный";
        } else if(weatherSpeedInfo > 8 && weatherSpeedInfo <= 11) {
            speedWind.innerHTML = "свежий";
        } else if(weatherSpeedInfo > 11 && weatherSpeedInfo <= 14) {
            speedWind.innerHTML = "сильный";
        } else if (weatherSpeedInfo > 14 && weatherSpeedInfo <= 17) {
            speedWind.innerHTML = "крепкий";
        } else if (weatherSpeedInfo > 17 && weatherSpeedInfo <= 21) {
            speedWind.innerHTML = "очень крепкий";
        } else if (weatherSpeedInfo > 21 && weatherSpeedInfo <= 25) {
            speedWind.innerHTML = "шторм";
        } else if (weatherSpeedInfo > 25 && weatherSpeedInfo <= 29) {
            speedWind.innerHTML = "сильный шторм";
        } else if (weatherSpeedInfo > 29 && weatherSpeedInfo <= 33) {
            speedWind.innerHTML = "жестокий шторм";
        } else if (weatherSpeedInfo > 33 && weatherSpeedInfo < 1000) {
            speedWind.innerHTML = "ураган";
        } else {
            return 1;
        }

        // $('.info').on('click', function() {
        //     $('.default-hidden').show(150);
        // });
        $( ".info" ).on('click', function() {     
            if($('.default-hidden:visible').length) {
                $('.default-hidden').hide(150);
                document.querySelector('.info').innerHTML = "Подробнее&#9660;";
            }
            else {
                $('.default-hidden').show(150);
                document.querySelector('.info').innerHTML = "Скрыть&#9650;";
            }
        });

        let thr = new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });;
        console.log(thr);
        yearUser.innerHTML = thr + " ";

        let sunrise = data.sys.sunrise;
        let datesr = new Date((sunrise + data.timezone)*1000);
        datesrCondition = datesr.getUTCHours();
        if(datesrCondition < 10 && datesrCondition >= 0) {
            datesrCondition = "0" + datesr.getUTCHours();
        }
        datesr = datesrCondition + ":" + datesr.getMinutes();

        let sunset = data.sys.sunset /* + data.timezone */ ;
        let datess = new Date((sunset + data.timezone)*1000);
        datess = datess.getUTCHours() + ":" + datess.getMinutes();
        sunriseCity.innerHTML = datesr;
        sunsetCity.innerHTML = datess;
        // Расписать алгоритм!

    })
    .catch(function() {
        console.log('Error connect to server!');
    });