//Block of Weather on Aside
    var aside = document.querySelector('aside');
    var divWeather = document.querySelectorAll('.weather');
    var arrW = ['Температура: ', 'Відчувається: ', 'Вітер(м/с): '];
    var arrType = ['x0.main.temp', 'x0.main.feels_like', 'x0.wind.speed'];
    function weatherInfo(url){
        return fetch(url);
    } //'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Kyiv'
    Promise.all([
        weatherInfo('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Kyiv'),
        weatherInfo('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Kyiv'),
        weatherInfo('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Kyiv')
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(function (x){
        for(var i = 0; i < 3; i++){
            var hWeather = document.createElement('h4');
            divWeather[i].appendChild(hWeather);
            hWeather.innerHTML = x[i].name;
                createSpan(i, x[i].main.temp, arrW[0]);
                createSpan(i, x[i].main.feels_like, arrW[1]);  
                createSpan(i, x[i].wind.speed, arrW[2]);
            var q = x[i].weather[0].id;
            
            if (q>=801&&q<804) {
                divWeather[i].setAttribute('class','few_clouds')
            }else if (q==804) {
                divWeather[i].setAttribute('class','clouds')
            }else if (q==800||q>=701&&q<782) {
                divWeather[i].setAttribute('class','clear')
            }else if (q>=200&&q<300) {
                divWeather[i].setAttribute('class','storm')
            }else if(q==500){
                divWeather[i].setAttribute('class','shower_day')
            }else if(q<=501&&q<532){
                divWeather[i].setAttribute('class','shower')
            }else if(q==600){
                divWeather[i].setAttribute('class','snow_day');
            }else{
                divWeather[i].setAttribute('class','snow');
            }
        }
        function createSpan (n, elem, m){
            var spanWeather = document.createElement('span');
            divWeather[n].appendChild(spanWeather);
            spanWeather.innerHTML = m + Math.round(elem) + '</br>';
        }
    })
    .catch(error => console.log(error));
//Next Block
    