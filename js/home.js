$("button[id^='link']").click(function() {
    $('[id^=link').css('display','block');
    $("button#"+ this.id).css('display','none');
    $("div[id^='page']").fadeOut('slow');
    $('div#' + this.id.replace('link','page')).fadeIn('slow').css('display','flex'); 
});
        
    var main = $('#main');
    var aside = $('aside');
    var divWeather = $('.weather');
    var arrW = ['Температура: ', 'Відчувається: ', 'Вітер(м/с): '];
    var arrType = ['x0.main.temp', 'x0.main.feels_like', 'x0.wind.speed'];

    function weatherInfo(url){
        return fetch(url);
    }
    Promise.all([
        /*weatherInfo('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Kyiv'),
        weatherInfo('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=London'),
        weatherInfo('http://api.openweathermap.org/data/2.5/weather?units=metric&appid=8bfab08f5522f06f55ad1f7ac130e9ed&lang=ua&q=Side'),
        weatherInfo('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')*/
        weatherInfo('/turiair/js/Kyiv/weather.json'),
        weatherInfo('/turiair/js/London/weather.json'),
        weatherInfo('/turiair/js/Side/weather.json'),
        weatherInfo('/turiair/js/bank/cash.json')
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(function (x){
//Block of Weather on Aside
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
            spanWeather.innerHTML = m + Math.round(elem) + '<br />';
        }
//Block of MoneyChange on Footer
        createSpanFoot(x[3][26].cc, x[3][26].rate, 1);
        createSpanFoot(x[3][32].cc, x[3][32].rate, 2);
        createSpanFoot(x[3][18].cc, x[3][18].rate, 3);
        function createSpanFoot (x, y, z){
            $('footer').prepend('<span>' + x + ':' + y.toFixed(2) + '</span>');
        }
    })
    .catch(error => console.log(error));

    