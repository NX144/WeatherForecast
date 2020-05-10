fetch('https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=8cb414b6309886a3b93b59e9f1b5695b')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        console.log(data);

        // Get elements:

        let cityBlock = document.querySelector('.city'),
            timeBlock = document.querySelector('.time-block'),
            descrWeather = document.querySelector('.descr'),
            humidityWeather = document.querySelector('.humidity-info'),
            temp = document.querySelector('.temp'),
            pressure = document.querySelector('.descr-title-pressure');
            //getTimes = data.dt,
            // dates = dates.toISOString().substr(11, 5);
            // timeBlock.innerHTML = dates;

        // Fill to blocks:


        getDatese = setTimeout(function tick() {
            let dates = new Date();
            let minutes = dates.getMinutes();
            let hours = dates.getHours();
            if(minutes < 10) minutes = "0" + minutes;
            if(hours < 10) hours = "0" + hours;
            timeBlock.innerHTML = `${hours}:${minutes}`;
            getDatese = setTimeout(tick, 1000);
        }, 1000);

        
        cityBlock.innerHTML = data.name;
        pressure.innerHTML = Math.floor(data.main['pressure'] / 1.345);
        temp.innerHTML = "+" + Math.round(data.main['temp'] - 273,15) + "&deg;";
        humidityWeather.innerHTML = data.main['humidity'] + "%";
        let weatherDescrInfo = data.weather[0]['main'];

        switch(weatherDescrInfo) {
            case "Clear":
                descrWeather.innerHTML = "Ясно";
                break;
            case "Clouds":
                descrWeather.innerHTML = "Переменная Облачность";
                break;
            case "Rain":
                descrWeather.innerHTML = "Дождь";
        }
        document.querySelector('.image').innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.weather[0]['icon'] +'@2x.png" alt="img-weather" class="image-block">';

        
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



        // let timer1 = document.querySelector('.timer');

        // function getDateFunc(time) {
        //     let minutes1 = Math.floor((time / (100 * 60)) % 60),
        //         hours1 = Math.floor((time / (100 * 60 * 60)) % 24);
        //         console.log(typeof(minutes1) + " " + typeof(hours1));

        //     if(minutes1 < 10) {
        //         minutes1 = "0" + minutes1;
        //     }
        //     if(hours1 < 10) {
        //         hours1 = "0" + hours1;
        //     }
        //     return `${hours1}:${minutes1}`;
        // }
        // timer1.innerHTML = getDateFunc(data.dt);

    })
    .catch(function() {
        console.log('Error connect to server!');
    });